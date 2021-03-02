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
import { setDriverStatus } from "../store/actions/data";

const ActiveService = (props) => {
  const [displayDrunkenMessage, setDisplayDrunkenMessage] = useState();
  const [displayLoginMessage, setDisplayLoginMessage] = useState();
  const [displayActiveMessage, setDisplayActiveMessage] = useState();
  const [status, setStatus] = useState("");
  const [tripPendingStatus, setTripPendingStatus] = useState(false);
  //const [driverRfid, setDriverRfid] = useState("");

  const dispatch = useDispatch();

  let userRfid = useSelector((state) => state.auth.userRfid);
  const stateStatus = useSelector((state) => state.data.stateStatus);

  // useEffect(() => {
  //   console.log(stateStatus," stateStatus");
  //   let isCancelled = false;
  //   if (!isCancelled) {
  //     if (stateStatus === 0) {
  //       console.log(stateStatus," stateStatus within");
        
  //       setTripPendingStatus(true);
  //       console.log(tripPendingStatus," tripPendingStatus");
  //     }
  //   }

  //   return () => {
  //     isCancelled = true;
  //     console.log("Cleaned");
  //   };
  // },[stateStatus]);

  useEffect(() => {
    console.log("Read Before");
    let isCancelled = false;
    if (!isCancelled) {
      console.log("Read After");
      const rfidId = userRfid;

      console.log(stateStatus," stateStatus within useEffect");
      if (stateStatus === 0) {
        setTripPendingStatus(true);
        console.log("Indised active setTripPendingStatus True True")
      }

      getDrunkenStatus(rfidId).onSnapshot((doc) => {
        console.log(stateStatus," stateStatus");
      

        const data = doc.data();
        //console.log("Single doc data ", data);
        if (data.status !== "logout") {
          console.log(data.status," data.status data.status")
          //const drunken = data.active && !data.drunken;
          const drunken = !data.active && data.drunken;
          // if (drunken) {
          //   setDisplayDrunkenMessage(drunken);
          //   setStatus("drunken");
          //   dispatch(setDriverStatus("drunken"));
          //   console.log("drunken Common Common State");
          // }

          const login = !data.active && !data.drunken;
          if (login) {
            setDisplayLoginMessage(login);
            setStatus("login");
            dispatch(setDriverStatus("login"));
            console.log("login Common Common State");
          }

          const active = data.active && !data.drunken;
          if (active) {
            setDisplayActiveMessage(active);
            setStatus("active");
            dispatch(setDriverStatus("active"));
            console.log("active Common Common State");
          }

          const hasPassenger = data.hasPassenger && !data.drunken;
          if (hasPassenger) {
            dispatch(setDriverStatus("hasPassenger"));
            console.log("hasPassenger Common Common State");
          }

          console.log(tripPendingStatus, "drunkenHasPassenger tripPendingStatus");
          const drunkenHasPassenger =
            (data.hasPassenger && data.drunken) ||
            (tripPendingStatus && data.drunken);
            console.log(drunkenHasPassenger, "drunkenHasPassenger drunkenHasPassenger");
          if (drunkenHasPassenger) {
            dispatch(setDriverStatus("drunkenHasPassenger"));
            console.log("drunkenHasPassenger Common Common State");
            console.log(tripPendingStatus, "drunkenHasPassenger tripPendingStatus");
            //setTripPendingStatus(false); // Double check this line
          }
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
      console.log("Cleaned");
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
