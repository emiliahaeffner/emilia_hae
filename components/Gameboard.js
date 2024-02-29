import { useEffect, useState } from "react";
import { Text, View, Pressable, useWindowDimensions } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../style/generalStyle";
import Header from "./Header";
import Footer from "./Footer";
import gameboardStyle from "../style/gameboardStyle";

let board = [];
let sumOfNbrs = [0, 0, 0, 0, 0, 0];
let selectNbrPos = false;
let selectDicePos = false;
let posThrow = true;
let getBonus = false;
let gameOver = false;

const Gameboard = ({
  name,
  NBR_OF_DICES,
  NBR_OF_THROWS,
  BONUS_POINTS,
  BONUS_POINTS_LIMIT,
}) => {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [message, setMessage] = useState("");
  const [sum, setSum] = useState(0);
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  const [usedNbrs, setUsedNbrs] = useState(new Array(NBR_OF_DICES).fill(false));

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  // Adjust icon size based on screen width
  let iconSize;
  if (windowWidth > 600 && windowHeight > 600) {
    // Large screen (iPad)
    iconSize = 70;
  } else {
    // Small screen (Phone)
    iconSize = 50;
  }

  // Adjust font size based on screen width
  const fontSize = windowWidth < 600 ? 12 : 18;
  const buttonSize = windowWidth < 600 ? 14 : 18;

  // Scoreboard

  // Function to add new score to scoreboard
  const addNewScore = async ({ name, score, date }) => {
    try {
      // Get old scores from AsyncStorage
      const oldScores = await AsyncStorage.getItem("scores");
      let scoreboard = oldScores ? JSON.parse(oldScores) : [];

      // Add new score to the scoreboard
      const newScore = { name, score, date: date.toString() };
      scoreboard.push(newScore);

      // Sort and save the scoreboard to AsyncStorage
      scoreboard.sort((a, b) => b.score - a.score);
      scoreboard = scoreboard.slice(0, 7);
      await AsyncStorage.setItem("scores", JSON.stringify(scoreboard));
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const handleEndGame = (name) => {
    const score = getBonus ? sum + BONUS_POINTS : sum;
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    addNewScore({ name, score, date: formattedDate });
  };

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date
    );
    return formattedDate.replace(/\//g, ".");
  };

  // Dices

  const selectDice = (i) => {
    if (selectDicePos) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    } else setMessage("You have to throw dices first");
  };

  //initiate the dices
  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable key={"row" + i} onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={iconSize}
          color={selectedDices[i] ? "white" : "grey"}
        ></MaterialCommunityIcons>
      </Pressable>
    );
  }

  // Numbers

  //initiate Numbers
  const nbrRow = [];
  for (let i = 0; i < 6; i++) {
    nbrRow.push(
      <View key={"nbrRow" + i}>
        <Text style={[gameboardStyle.nbrSum, { fontSize: fontSize }]}>
          {sumOfNbrs[i]}
        </Text>
        <Pressable key={"nbrRow" + i} onPress={() => useNbr(i)}>
          <MaterialCommunityIcons
            name={"numeric-" + (i + 1) + "-circle"}
            key={"nbrRow" + i}
            size={iconSize}
            color={usedNbrs[i] ? "white" : "grey"}
          />
        </Pressable>
      </View>
    );
  }

  //Use number
  function useNbr(i) {
    if (posThrow && !gameOver) {
      setMessage("Throw 3 times before setting points.");
    } else {
      let nbrs = [...usedNbrs];
      if (selectNbrPos && !nbrs[i]) {
        nbrs[i] = true;
        setUsedNbrs(nbrs);
        var tempSum = 0;
        for (let x = 0; x < row.length; x++) {
          var diceVal = parseInt(board[x].match(/(\d+)/)[0]);
          if (diceVal - 1 === i) {
            tempSum += diceVal;
          }
        }
        sumOfNbrs[i] = tempSum;
        setSum(sum + parseInt(tempSum));
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setNbrOfThrowsLeft(3);
      } else if (nbrs[i]) {
        setMessage("You already selected points for " + (i + 1));
      }
    }
  }

  // Play the game

  function throwDices() {
    if (posThrow && !gameOver) {
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1);
          board[i] = "dice-" + randomNumber;
        }
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    } else if (gameOver) {
      newGame();
    }
  }

  function checkBonus() {
    if (sum >= BONUS_POINTS_LIMIT) {
      getBonus = true;
      return "You got the bonus!";
    } else {
      return (
        "You are " + (BONUS_POINTS_LIMIT - sum) + " points away from bonus."
      );
    }
  }

  useEffect(() => {
    if (nbrOfThrowsLeft === 0 && !gameOver) {
      setMessage("Select your points before next throw.");
      posThrow = false;
      selectNbrPos = true;
    } else if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameOver) {
      setMessage("Select and throw dices again.");
      posThrow = true;
      selectNbrPos = true;
      selectDicePos = true;
    } else if (
      nbrOfThrowsLeft === NBR_OF_THROWS &&
      !usedNbrs.every((x) => x === true)
    ) {
      setMessage("Throw dices.");
      posThrow = true;
      selectNbrPos = false;
      selectDicePos = false;
    } else if (
      nbrOfThrowsLeft === NBR_OF_THROWS &&
      usedNbrs.every((x) => x === true)
    ) {
      setMessage("Game over. All points selected.");
      posThrow = false;
      selectDicePos = false;
      selectNbrPos = false;
      gameOver = true;
      handleEndGame(name);
      setNbrOfThrowsLeft(0);
    }
  }, [nbrOfThrowsLeft]);

  function newGame() {
    gameOver = false;
    setSum(0);
    setUsedNbrs(new Array(6).fill(false));
    sumOfNbrs = [0, 0, 0, 0, 0, 0];
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    selectNbrPos = true;
    selectDicePos = true;
    posThrow = true;
    getBonus = false;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Header />
      </View>
      <View style={styles.centeredContainer}>
        <View>
          {nbrOfThrowsLeft == 3 ? (
            <View>
              <Ionicons
                name="dice"
                style={[styles.icon, { fontSize: iconSize }]}
              />
            </View>
          ) : (
            <View style={gameboardStyle.flex}>{row}</View>
          )}
          <Text
            style={{
              ...gameboardStyle.textGameboard,
              fontSize: fontSize,
            }}
          >
            Throws left: {nbrOfThrowsLeft}
          </Text>
          <Text
            style={{
              ...gameboardStyle.textGameboard,
              fontSize: fontSize,
            }}
          >
            {message}
          </Text>
        </View>
        <View style={[styles.innerContainer]}>
          <Pressable
            style={{
              ...gameboardStyle.gameboardButton,
              fontSize: buttonSize,
            }}
            onPress={() => throwDices()}
          >
            <Text
              style={{
                ...gameboardStyle.gameboardButtonText,
                fontSize: fontSize,
              }}
            >
              {gameOver ? "NEW GAME" : "THROW DICES"}
            </Text>
          </Pressable>
          <Text
            style={{
              ...gameboardStyle.textGameboard,
              fontSize: fontSize,
            }}
          >
            Total: {getBonus ? sum + BONUS_POINTS : sum}
          </Text>
          <Text
            style={{
              ...gameboardStyle.textGameboard,
              fontSize: fontSize,
            }}
          >
            {checkBonus()}
          </Text>
          <View style={[gameboardStyle.flex, { fontSize: fontSize }]}>
            {nbrRow}
          </View>
          <Text
            style={{
              ...gameboardStyle.textGameboard,
              fontSize: fontSize,
            }}
          >
            Player: {name}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default Gameboard;
