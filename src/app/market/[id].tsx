import { useEffect, useState, useRef } from "react";
import { View, Alert, Modal, StatusBar, ScrollView } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";

import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Coupon } from "@/components/market/coupon";
import { Details, PropsDetails } from "@/components/market/details";

import { api } from "@/services/api";

type MarketProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const [market, setMarket] = useState<MarketProps>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string }>();

  const qrLock = useRef(false);
  console.log(params.id);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setMarket(data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Market", "It was not possible to fetch the market", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert("Camera", "You need to grant the camera permission");
      }

      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log(error);
      Alert.alert("Camera", "It was not possible to open the camera");
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);

      console.log("getCoupon", id);

      const { data } = await api.patch("/coupons/" + id);

      Alert.alert("Coupon", data.coupon);

      setCoupon(data.coupon);
    } catch (error) {
      console.log(error);

      Alert.alert("Error", "It was not possible to redeem the coupon");
    } finally {
      setCouponIsFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);

    Alert.alert(
      "Coupon",
      "It is not possible to reuse a redeemed coupon. Do you like to redeem it?",
      [
        { style: "cancel", text: "No" },
        { text: "Yes", onPress: () => getCoupon(id) },
      ]
    );
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) return <Loading />;

  if (!market) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market.cover} />
        <Details data={market} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Read QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Back</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
