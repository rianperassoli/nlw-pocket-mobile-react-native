import { View, Text, Image } from "react-native";

import { styles } from "./styles";

export function Welcome() {
  return (
    <View>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>Welcome to Nearby!</Text>
      <Text style={styles.subtitle}>
        Get coupons to use at your {"\n"}
        favorite places.
      </Text>
    </View>
  );
}
