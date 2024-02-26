import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "space-between",
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
    display: "flex",
    justifyContent: "center",
  },
  content: {
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 57,
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
    fontSize: 20,
    textAlign: "center",
    marginTop: 17,
    fontFamily: "Gill Sans",
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
    fontSize: 15,
    textAlign: "center",
    marginTop: 17,
    fontFamily: "Gill Sans",
  },
});

export default styles;
