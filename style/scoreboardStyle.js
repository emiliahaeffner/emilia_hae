import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const scoreboardStyle = StyleSheet.create({
  //Scoreboard
  scoreboardHeader: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    paddingBottom: 25,
    color: "white",
    fontFamily: "Verdana",
  },
  clearButton: {
    margin: windowWidth * 0.03,
    padding: 10,
    backgroundColor: "purple",
    width: windowWidth * 0.5,
    borderRadius: 15,
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Gill Sans",
  },
  headerScoreboard: {
    backgroundColor: "#ffffff", // Header background color
  },
});

export default scoreboardStyle;
