import { StatusBar } from "expo-status-bar";
import { View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import Home from "./components/Home";
import styles from "./style/generalStyle";

const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const MIN_SPOT = 1;
const MAX_SPOT = 6;
const BONUS_POINTS_LIMIT = 63;
const BONUS_POINTS = 50;

const Tab = createBottomTabNavigator();

export default function App({}) {
  const [name, setName] = useState("");

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  // Adjust icon size based on screen width
  let iconSize;
  if (windowWidth > 600 && windowHeight > 600) {
    // Large screen (iPad)
    iconSize = 25;
  } else {
    // Small screen (Phone)
    iconSize = 20;
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: "black",
            },
            headerStyle: {
              backgroundColor: "black",
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? "information-circle"
                  : "information-circle-outline";
              } else if (route.name === "Gameboard") {
                iconName = focused ? "dice" : "dice-outline";
              } else if (route.name === "Scoreboard") {
                iconName = focused ? "list-circle" : "list-circle-outline";
              }
              return <Ionicons name={iconName} size={iconSize} color={color} />;
            },

            display: "flex",

            tabBarActiveTintColor: "purple",
            tabBarInactiveTintColor: "white",
            headerTitleAlign: "center",
          })}
        >
          <Tab.Screen
            name="Home"
            options={{
              tabBarStyle: { display: "none" },
              headerTintColor: "white",
              // alignSelf: "center" for Android?
            }}
          >
            {(props) => (
              <Home
                {...props}
                name={name}
                setName={setName}
                NBR_OF_DICES={NBR_OF_DICES}
                NBR_OF_THROWS={NBR_OF_THROWS}
                MIN_SPOT={MIN_SPOT}
                MAX_SPOT={MAX_SPOT}
                BONUS_POINTS_LIMIT={BONUS_POINTS_LIMIT}
                BONUS_POINTS={BONUS_POINTS}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Gameboard" options={{ headerTintColor: "white" }}>
            {(props) => (
              <Gameboard
                {...props}
                name={name}
                setName={setName}
                NBR_OF_DICES={NBR_OF_DICES}
                NBR_OF_THROWS={NBR_OF_THROWS}
                MIN_SPOT={MIN_SPOT}
                MAX_SPOT={MAX_SPOT}
                BONUS_POINTS_LIMIT={BONUS_POINTS_LIMIT}
                BONUS_POINTS={BONUS_POINTS}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Scoreboard" options={{ headerTintColor: "white" }}>
            {(props) => <Scoreboard {...props} name={name} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
