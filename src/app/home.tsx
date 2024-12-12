import { useEffect } from "react";
import { View, Alert } from "react-native";

import { api } from "@/services/api";

export default function Home() {
  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");

      console.log(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Categories", "It was not possible to fetch the categories");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return <View style={{ flex: 1 }}></View>;
}
