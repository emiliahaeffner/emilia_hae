import { Text, View, useWindowDimensions } from "react-native";
import styles from "../style/generalStyle";
import { Platform } from "react-native";

export default Footer = () => {
  const windowWidth = useWindowDimensions().width;

  // Adjust font size based on screen width
  const footerFont = windowWidth < 600 ? 14 : 17;

  const fontFamily = Platform.select({
    ios: {
      fontFamily: "Optima", // iOS specific fontFamily
    },
    android: {
      fontFamily: "monospace", // Android specific fontFamily
    },
  });

  return (
    <View style={styles.footer}>
      <Text style={{ ...styles.author, fontSize: footerFont, ...fontFamily }}>
        Emilia Häffner
      </Text>
    </View>
  );
};
