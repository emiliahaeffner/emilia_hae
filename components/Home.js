import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  Dimensions,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { KeyboardAvoidingView } from "react-native";
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

  // Adjust icon and fonts to the screen size

  let iconSize;
  if (windowWidth > 600 && windowHeight > 600) {
    // Large screen (iPad)
    iconSize = 70;
  } else {
    // Small screen (Phone)
    iconSize = 50;
  }

  const fontSize = windowWidth < 600 ? 12 : 18;
  const headerSize = windowWidth < 600 ? 20 : 30;
  const buttonSize = windowWidth < 600 ? 14 : 18;

  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const textInputRef = React.createRef();

  // When the button is pressed it checks if the name entry is empty and then continue to switch to the next page (rules)
  const showRules = () => {
    if (!name.trim()) {
      alert("Name entry is empty");
    } else {
      setButtonPressed(true);
    }
  };

  // Displaying the rules after the button is pressed
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
            style={[homeStyle.homeButton]}
            onPress={() => navigation.navigate("Gameboard")}
          >
            <Text style={[homeStyle.homeButtonText, { fontSize: buttonSize }]}>
              PLAY
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Display Header */}
        <View style={styles.headerStyle}>
          <Header />
        </View>
        <View style={[styles.centeredContainer]}>
          {/* checking if the button is pressed and either display the name entry screen or the rules screen */}
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
                  style={homeStyle.homeTextInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="name"
                  keyboardType={"default"}
                  placeholderTextColor={"lightgrey"}
                  ref={textInputRef}
                  autoFocus={true}
                />
              </View>
              <View style={styles.innerContainer}>
                <Pressable style={[homeStyle.homeButton]} onPress={showRules}>
                  <Text
                    style={[homeStyle.homeButtonText, { fontSize: buttonSize }]}
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
    </KeyboardAvoidingView>
  );
};

export default Home;
