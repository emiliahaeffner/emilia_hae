import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const scoreboardStyle = StyleSheet.create({
  scoreboardHeader: {
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 25,
    color: "white",
    fontFamily: "Roboto",
  },
  clearButton: {
    margin: windowWidth * 0.03,
    padding: 10,
    marginTop: 30,
    backgroundColor: "purple",
    width: windowWidth * 0.45,
    borderRadius: 15,
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  headerScoreboard: {
    backgroundColor: "#bab8b8",
  },
  textScoreboard: {
    color: "white",
    paddingBottom: 10,
    textAlign: "center",
    fontFamily: "Roboto",
  },
});

export default scoreboardStyle;
