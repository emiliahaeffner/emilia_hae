import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../style/generalStyle";
import Header from "./Header";
import Footer from "./Footer";
import homeStyle from "../style/homeStyle";

const Home = ({
  navigation,
  name,
  setName,
  NBR_OF_DICES,
  NBR_OF_THROWS,
  MAX_SPOT,
  MIN_SPOT,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  let iconSize;
  if (windowWidth > 600 && windowHeight > 600) {
    // Large screen, such as iPad
    iconSize = 70; // Adjust the size as needed
  } else {
    // Small screen, such as phones
    iconSize = 50; // Default size for small screens
  }

  const fontSize = windowWidth < 600 ? 11 : 16;
  const headerSize = windowWidth < 600 ? 20 : 30;

  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    // Focus on the text input when the component mounts

    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const textInputRef = React.createRef();

  // activate button and check if something was entered into textInputField --> if empty: alarm
  const showRules = () => {
    if (!name.trim()) {
      alert("Name entry is empty");
    } else {
      setButtonPressed(true);
    }
  };

  // rules of the game - const are in the App.js
  const rules = () => {
    return (
      <View>
        <View>
          <Text style={[homeStyle.rulesHeader, { fontSize: headerSize }]}>
            Rules of the game
          </Text>
        </View>
        <View>
          <Text style={[homeStyle.rulesText, { fontSize: fontSize }]}>
            THE GAME: Upper section of the classic Yahtzee dice {"\n"} game. You
            have {NBR_OF_DICES} dices and for every dice you have {"\n"}{" "}
            {NBR_OF_THROWS} throws. After each throw you can keep dices in order{" "}
            {"\n"} to get same dice spot counts as many as possible. In {"\n"}{" "}
            the end of the turn you must select your points from {MIN_SPOT}{" "}
            {"\n"} to {MAX_SPOT}. Game ends when all points have been selected.{" "}
            {"\n"} The order for selecting those is free.{"\n"}
          </Text>
          <Text style={[homeStyle.rulesText, { fontSize: fontSize }]}>
            POINTS: After each turn, the game calculates the sum for {"\n"}the
            dices you selected. Only the dices having the same {"\n"}spot count
            are calculated. Inside the game you cannot {"\n"}select same points
            from {MIN_SPOT} to {MAX_SPOT} again.{"\n"}
          </Text>
          <Text style={[homeStyle.rulesText, { fontSize: fontSize }]}>
            GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points{" "}
            {"\n"}is the limit of getting a bonus which gives you {BONUS_POINTS}{" "}
            points {"\n"}more.
          </Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={[homeStyle.playerText, { fontSize: fontSize }]}>
            Good luck, {name}
          </Text>
          <Pressable
            style={[homeStyle.homeButton, { padding: fontSize }]}
            onPress={() => navigation.navigate("Gameboard")}
          >
            <Text style={[homeStyle.homeButtonText, { fontSize: fontSize }]}>
              PLAY
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Header />
      </View>
      <View style={styles.centeredContainer}>
        {!buttonPressed ? (
          <View>
            <View>
              <Ionicons
                name="information-circle"
                style={[styles.icon, { fontSize: iconSize }]}
              />
              <Text style={{ ...homeStyle.textHome, fontSize: fontSize }}>
                For scoreboard enter your name ...
              </Text>
              <TextInput
                style={[homeStyle.homeTextInput, { fontSize: fontSize }]}
                value={name}
                onChangeText={setName}
                placeholder="name"
                clearButtonMode={"always"}
                keyboardType={"default"}
                placeholderTextColor={"lightgrey"}
                ref={textInputRef}
              />
            </View>
            <View style={styles.innerContainer}>
              <Pressable
                style={[homeStyle.homeButton, { padding: fontSize }]}
                onPress={showRules}
              >
                <Text
                  style={[homeStyle.homeButtonText, { fontSize: fontSize }]}
                >
                  OK
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View>
            <Ionicons
              name="information-circle"
              style={[styles.icon, { fontSize: iconSize }]}
            />
            {rules()}
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default Home;
