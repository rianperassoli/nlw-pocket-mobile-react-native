import { FlatList } from "react-native";
import { Category } from "../category";

import { styles } from "./styles";

export type CategoriesProps = {
  id: string;
  name: string;
}[];

interface CategoriesComponentProps {
  data: CategoriesProps;
  selected: string;
  onSelect: (id: string) => void;
}

export function Categories({
  data,
  selected,
  onSelect,
}: CategoriesComponentProps) {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          isSelected={selected === item.id}
          onPress={() => onSelect(item.id)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
