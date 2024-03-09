import * as React from "react";
import { Provider as PaperProvider, DataTable } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    // Large screen (iPad)
    iconSize = 70;
  } else {
    // Small screen(phone)
    iconSize = 50;
  }

  // Adjust font size based on screen width
  const fontSize = windowWidth < 600 ? 12 : 18;
  const headerSize = windowWidth < 600 ? 20 : 30;
  const buttonSize = windowWidth < 600 ? 14 : 18;

  useFocusEffect(
    React.useCallback(() => {
      getScoreboard();
    }, [])
  );

  // Getting the data of the Gameboard from the async storage
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

  // Clearing the Scoreboard entries
  const clearScoreboard = async () => {
    try {
      await AsyncStorage.removeItem("scores");
      setScoreboard([]);
    } catch (error) {
      console.error("Error clearing scoreboard:", error);
    }
  };

  // Score rank calculation / sorting based on the score
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
            Top Five
          </Text>
        </View>
        {/* When there are no entries in the Scoreboard the message is displayed, otherwise the DataTable gets displayed with the rank */}
        {scoreboard.length === 0 ? (
          <Text
            style={{ ...scoreboardStyle.textScoreboard, fontSize: fontSize }}
          >
            Scoreboard is empty
          </Text>
        ) : (
          <>
            <DataTable>
              <DataTable.Header style={scoreboardStyle.headerScoreboard}>
                <DataTable.Title style={{ flex: 0.75 }}>Rank</DataTable.Title>
                <DataTable.Title style={{ flex: 1.25 }}>Name</DataTable.Title>
                <DataTable.Title style={{ flex: 1.75 }}>
                  Date & Time
                </DataTable.Title>
                <DataTable.Title numeric style={{ flex: 0.75 }}>
                  Score
                </DataTable.Title>
              </DataTable.Header>

              <ScrollView>
                {rankedScoreboard.slice(0, 5).map((score, index) => (
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
                    <DataTable.Cell style={{ flex: 1.75 }}>
                      {score.date}
                    </DataTable.Cell>
                    <DataTable.Cell numeric style={{ flex: 0.75 }}>
                      {score.score}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </ScrollView>
            </DataTable>
            <Pressable
              onPress={clearScoreboard}
              style={[scoreboardStyle.clearButton, { fontSize: buttonSize }]}
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
