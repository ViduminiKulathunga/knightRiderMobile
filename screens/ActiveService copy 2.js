import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Color";
import HeaderButton from "../components/UI/HeaderButton";

import { getDrunkenStatus } from "../firebase";

const ActiveService = (props) => {
  const [displayMessage, setDisplayMessage] = useState();

  useEffect(() => {
    const rfidId = "knight_KBLMLUL0IGBWC";
    getDrunkenStatus(rfidId).onSnapshot((doc) => {
      const data = doc.data();
      //console.log("Single doc data ", data);

      const shortest = data.active && !data.drunken;

      setDisplayMessage(shortest);
      if (shortest) {
        createTwoButtonAlert();
      }
    });
  }, []);

  const createTwoButtonAlert = () => {
    alert("Hiiii");
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
  };
  return (
    <LinearGradient
      colors={["#021618", "#04506f", "#01a0ac"]}
      style={styles.gradient}
    >
      <View style={styles.UserView}>
        <Text>ActiveService Screen</Text>
        {displayMessage && <Text>Hiaaa</Text>}
      </View>
    </LinearGradient>
  );
};

ActiveService.navigationOptions = (navData) => {
  return {
    headerTitle: "Active Service",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: Colors.primary,
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  UserView: {
    padding: 10,
    color: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default ActiveService;
