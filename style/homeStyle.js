import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const homeStyle = StyleSheet.create({
  textHome: {
    color: "white",
    fontsize: 25,
    paddingBottom: 10,
    textAlign: "center",
    fontFamily: "Verdana",
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
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Gill Sans",
  },
  homeTextInput: {
    textAlign: "center",
    backgroundColor: "#000000",
    color: "white",
    fontSize: 14,
    padding: 7,
    fontFamily: "Verdana",
  },
  // Home - Rules
  rulesHeader: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 25,
    color: "white",
    fontFamily: "Verdana",
  },
  rulesText: {
    textAlign: "center",
    fontSize: 16,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 5,
    color: "white",
    fontFamily: "Verdana",
  },
  playerText: {
    fontSize: 16,
    textAlign: "center",
    padding: 20,
    color: "white",
    fontFamily: "Verdana",
  },
});

export default homeStyle;
