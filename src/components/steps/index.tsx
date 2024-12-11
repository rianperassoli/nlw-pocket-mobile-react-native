import { View, Text } from "react-native";
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";
import { Step } from "../step";

import { styles } from "./styles";

export function Steps() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How it works:</Text>

      <Step
        title="Find a place"
        description="Look for partners places nearby"
        icon={IconMapPin}
      />
      <Step
        title="Activate the coupon using QR-Code"
        description="Scan the QR-Code at the place to use the benefits"
        icon={IconQrcode}
      />
      <Step
        title="Use benefits nearby"
        description="Activate coupons where you are, in different kinds of places"
        icon={IconTicket}
      />
    </View>
  );
}
