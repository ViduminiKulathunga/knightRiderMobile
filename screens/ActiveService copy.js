import React, { useState, useEffect, useRef } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Color";
import Card from "../components/UI/Card";
import HeaderButton from "../components/UI/HeaderButton";
import { Ionicons } from "@expo/vector-icons";

import { getDrunkenStatus } from "../firebase";

import { restUser } from "../store/actions/auth";

const ActiveService = (props) => {
  const [displayDrunkenMessage, setDisplayDrunkenMessage] = useState();
  const [displayLoginMessage, setDisplayLoginMessage] = useState();
  const [displayActiveMessage, setDisplayActiveMessage] = useState();
  const [status, setStatus] = useState("");
  const [driverRfid, setDriverRfid] = useState("");

  const dispatch = useDispatch();

  let userRfid = useSelector((state) => state.auth.userRfid);

 

  
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      const rfidId = userRfid;

      getDrunkenStatus(rfidId).onSnapshot((doc) => {
        const data = doc.data();
        //console.log("Single doc data ", data);

        //const drunken = data.active && !data.drunken;
        const drunken = !data.active && data.drunken;
        if (drunken) {
          setDisplayDrunkenMessage(drunken);
          setStatus("drunken");
        }

        const login = !data.active && !data.drunken;
        if (login) {
          setDisplayLoginMessage(login);
          setStatus("login");
        }

        const active = data.active && !data.drunken;
        if (active) {
          setDisplayActiveMessage(active);
          setStatus("active");
        }
      });
    }
    console.log("Clean Clean");
    //Please Double check this action again..!!!!
    // return () => {
    //   console.log(userRfid, " Before userRfid");
    //   isRendered = false;
    //   console.log("Clean up working");
      
    //   console.log(userRfid, " After userRfid");
    // };
    return () => {
      isCancelled = true;
    };
    // return () => {
    //   userRfid === "";
    //   console.log("Clean up working");
    //   console.log(" userRfid ", userRfid);
    // };
    //const rfidId = "knight_KBLMLUL0IGBWC";
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
      <Card style={styles.authContainer}>
        <View style={styles.UserView}>
          {displayDrunkenMessage && status === "drunken" && (
            <View style={styles.textCenter}>
              <Ionicons
                name={Platform.OS === "android" ? "md-alert" : "ios-alert"}
                size={34}
                color={Colors.red}
                style={styles.icon}
              />
              <Text style={styles.warining}>
                Your Service is Temporary Unavailable!!
              </Text>
              <Text style={styles.warining}>
                Please Tap Identity Card for Active your service in few hours.
              </Text>
              <Text style={styles.warining}>Please Try Few Hours Later..</Text>
            </View>
          )}
          {displayLoginMessage && status === "login" && (
            <View style={styles.textCenter}>
              <Ionicons
                name={Platform.OS === "android" ? "md-lock" : "ios-lock"}
                size={34}
                color={Colors.gray}
                style={styles.icon}
              />
              <Text style={styles.textCenterItem}>
                Please Tap Identity Card for Active your service..
              </Text>
            </View>
          )}
          {displayActiveMessage && status === "active" && (
            <View style={styles.textCenter}>
              <Ionicons
                name={
                  Platform.OS === "android"
                    ? "md-checkmark-circle"
                    : "ios-checkmark-circle"
                }
                size={34}
                color={Colors.green}
                style={styles.icon}
              />
              <Text style={styles.activeText}>
                Congratulations! Your Service is Active..
              </Text>
            </View>
          )}
        </View>
      </Card>
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
      backgroundColor: Colors.peacockBlue,
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
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 500,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 40,
    paddingBottom: 40,
    justifyContent: "center",
  },
  UserView: {
    padding: 20,
    height: 100,
  },
  textCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    alignItems: "center",
    height: "40%",
    padding: 10,
  },
  warining: {
    color: Colors.red,
    width: "100%",
    textAlign: "center",
    fontSize: 16,
  },
  textCenterItem: { width: "100%", textAlign: "center", fontSize: 16 },
  activeText: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    color: Colors.darkGreen,
  },
  icon: { marginBottom: 7 },
});

export default ActiveService;
