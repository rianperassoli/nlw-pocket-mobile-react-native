import { View, FlatList } from "react-native";
import { IconProps } from "@tabler/icons-react-native";

import { colors } from "@/styles/theme";

import { styles } from "./styles";
import { Category } from "../category";

export type CategoriesProps = {
  id: string;
  name: string;
}[];

interface CategoriesComponentProps {
  data: CategoriesProps;
}

export function Categories({ data }: CategoriesComponentProps) {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category key={item.id} name={item.name} iconId={item.id} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
