import { Text, View, useWindowDimensions } from "react-native";
import styles from "../style/generalStyle";

export default Header = () => {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  // Adjust font size based on screen width
  const fontSize = windowWidth < 600 ? 14 : 16;

  return (
    <View style={styles.header}>
      <Text style={{ ...styles.headerTitle, fontSize: fontSize }}>
        Mini-Yahtzee
      </Text>
    </View>
  );
};
