import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  navigation: {
    padding: 5,
    margin: 5,
  },
  innerContainer: {
    alignItems: "center",
  },
  centeredContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    justifyContent: "space-between",
  },
  icon: {
    color: "white",
    textAlign: "center",
    paddingBottom: 15,
  },
  // Header style
  headerStyle: {
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginTop: 17,
  },
  // Footer style
  footer: {
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  author: {
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginTop: 17,
  },
});

export default styles;
