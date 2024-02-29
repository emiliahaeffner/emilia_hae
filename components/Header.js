import { Text, View, useWindowDimensions } from "react-native";
import styles from "../style/generalStyle";
import { Platform } from "react-native";
// import {
//   useFonts,
//   Montserrat_400Regular,
//   Montserrat_700Bold,
// } from "@expo-google-fonts/montserrat";

export default Header = () => {
  const windowWidth = useWindowDimensions().width;

  // Adjust font size based on screen width
  const headerFont = windowWidth < 600 ? 14 : 17;

  const fontFamily = Platform.select({
    ios: {
      fontFamily: "Optima", // iOS specific fontFamily
    },
    android: {
      fontFamily: "monospace", // Android specific fontFamily
    },
  });

  return (
    <View style={styles.header}>
      <Text
        style={{ ...styles.headerTitle, fontSize: headerFont, ...fontFamily }}
      >
        Mini-Yahtzee
      </Text>
    </View>
  );
};
