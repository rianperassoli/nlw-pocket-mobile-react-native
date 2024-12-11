import { ActivityIndicator } from "react-native";
import { colors } from "@/styles/colors";

import { styles } from "./styles";

export function Loading() {
  return (
    <ActivityIndicator
      size="large"
      color={colors.green.base}
      style={styles.container}
    />
  );
}
