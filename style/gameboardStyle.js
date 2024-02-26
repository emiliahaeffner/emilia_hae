import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const gameboardStyle = StyleSheet.create({
  // Gameboard
  flex: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  textGameboard: {
    color: "white",
    fontsize: 25,
    padding: 5,
    textAlign: "center",
    fontFamily: "Verdana",
  },
  gameboardButton: {
    margin: windowWidth * 0.03,
    flexDirection: "row",
    padding: 10,
    margin: 20,
    backgroundColor: "purple",
    width: windowWidth * 0.4,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  gameboardButtonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Gill Sans",
  },
  nbrSum: {
    color: "white",
    flexDirection: "row",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 3,
  },
});

export default gameboardStyle;
