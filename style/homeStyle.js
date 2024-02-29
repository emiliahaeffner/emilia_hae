import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const homeStyle = StyleSheet.create({
  textHome: {
    color: "white",
    paddingBottom: 10,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  homeButton: {
    margin: windowWidth * 0.03,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "purple",
    width: windowWidth * 0.3,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  homeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  homeTextInput: {
    width: "80%",
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: "#000000",
    color: "white",
    padding: 7,
    fontFamily: "Roboto",
  },
  // Home - Rules
  rulesHeader: {
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 25,
    color: "white",
    fontFamily: "Roboto",
  },
  rulesText: {
    textAlign: "center",
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 5,
    color: "white",
    fontFamily: "Roboto",
  },
  playerText: {
    textAlign: "center",
    padding: 20,
    color: "white",
    fontFamily: "Roboto",
  },
});

export default homeStyle;
