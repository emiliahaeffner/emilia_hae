import * as React from "react";
import { DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Column as Col, Row } from "react-native-flexbox-grid";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Text,
  ScrollView,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../style/generalStyle";
import scoreboardStyle from "../style/scoreboardStyle";

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState([]);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  // Adjust icon size based on screen width
  let iconSize;
  if (windowWidth > 600 && windowHeight > 600) {
    // Large screen, such as iPad
    iconSize = 70; // Adjust the size as needed
  } else {
    // Small screen, such as phones
    iconSize = 50; // Default size fo
  }

  // Adjust font size based on screen width
  const fontSize = windowWidth < 600 ? 11 : 16;
  const headerSize = windowWidth < 600 ? 20 : 30;

  useFocusEffect(
    // TODO: Get scoreboard from storage
    // Save scoreboard to a varialbe "scoreboard"

    React.useCallback(() => {
      getScoreboard();

      //setScoreboard(scoreboard);
    }, [])
  );

  const getScoreboard = async () => {
    try {
      const scores = await AsyncStorage.getItem("scores");
      if (scores) {
        const parsedScores = JSON.parse(scores);
        setScoreboard(parsedScores);
      }
    } catch (error) {
      console.error("Error getting scoreboard:", error);
    }
  };

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.removeItem("scores");
      setScoreboard([]);
    } catch (error) {
      console.error("Error clearing scoreboard:", error);
    }
  };

  // Function to calculate rank based on score
  const calculateRank = () => {
    const sortedScores = [...scoreboard].sort((a, b) => b.score - a.score);
    return sortedScores.map((score, index) => ({
      ...score,
      rank: index + 1,
    }));
  };

  const rankedScoreboard = calculateRank();

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Header />
      </View>
      <View style={styles.centeredContainer}>
        <Ionicons
          name="list-circle"
          style={[styles.icon, { fontSize: iconSize }]}
        />

        <View style={styles.innerContainer}>
          <Text
            style={[scoreboardStyle.scoreboardHeader, { fontSize: headerSize }]}
          >
            Top Three
          </Text>
        </View>
        {scoreboard.length === 0 ? (
          <Text style={{ ...styles.textGameboard, fontSize: fontSize }}>
            Scoreboard is empty
          </Text>
        ) : (
          <>
            <DataTable>
              <DataTable.Header style={scoreboardStyle.headerScoreboard}>
                <DataTable.Title style={{ flex: 0.75 }}>Rank</DataTable.Title>
                <DataTable.Title style={{ flex: 1.25 }}>Name</DataTable.Title>
                <DataTable.Title style={{ flex: 1.5 }}>
                  Date & Time
                </DataTable.Title>
                <DataTable.Title numeric style={{ flex: 0.75 }}>
                  Score
                </DataTable.Title>
              </DataTable.Header>
              {rankedScoreboard.slice(0, 3).map((score, index) => (
                <DataTable.Row
                  key={index}
                  style={scoreboardStyle.headerScoreboard}
                >
                  <DataTable.Cell style={{ flex: 0.75 }}>
                    {score.rank}.
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1.25 }}>
                    {score.name}
                  </DataTable.Cell>
                  <DataTable.Cell style={{ flex: 1.5 }}>
                    {score.date}
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ flex: 0.75 }}>
                    {score.score}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
            <Pressable
              onPress={clearScoreboard}
              style={[scoreboardStyle.clearButton, { padding: fontSize }]}
            >
              <Text
                style={{
                  ...scoreboardStyle.clearButtonText,
                  fontSize: fontSize,
                }}
              >
                CLEAR SCOREBOARD
              </Text>
            </Pressable>
          </>
        )}
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default Scoreboard;
