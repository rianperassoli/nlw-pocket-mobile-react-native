import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { Categories, CategoriesProps } from "@/components/categories";
import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";
import { api } from "@/services/api";

type MarketProps = PlaceProps;

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [markets, setMarkets] = useState<MarketProps[]>([]);
  const [category, setCategory] = useState("");

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");

      setCategories(data);
      setCategory(data[0].id);
    } catch (error) {
      console.log(error);
      Alert.alert("Categories", "It was not possible to fetch the categories");
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) return;

      const { data } = await api.get("/markets/category/" + category);

      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Places", "It was not possible to fetch the places");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        selected={category}
        onSelect={setCategory}
      />

      <Places data={markets} />
    </View>
  );
}
