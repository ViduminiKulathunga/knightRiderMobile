import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  BackHandler,
  Alert,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import Colors from "../constants/Color";
import { LinearGradient } from "expo-linear-gradient";
import TripImage from "../assets/images/Geolocation.gif";

import BtnComponent from "../components/Trip/BtnComponent";
import DisplayComponent from "../components/Trip/DisplayComponent";

import { HeaderBackButton } from "react-navigation-stack";

import { updateTripAccepted } from "../firebase";

import {
  setAciveCustomer,
  setTrip,
  setOnTrip,
  setCommission,
} from "../store/actions/data";

const Trip = (props) => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();

  const customerId = props.navigation.getParam("customerId");
  const startD = props.navigation.getParam("start");
  const end = props.navigation.getParam("end");
  const commission = props.navigation.getParam("commission");
  const fullName = props.navigation.getParam("fullName");
  const phone = props.navigation.getParam("phone");

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  let updateMs = time.ms,
    updateS = time.s,
    updateM = time.m,
    updateH = time.h;

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
    console.log("Stooped");
  };

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    updateTripAccepted(customerId);
    dispatch(setOnTrip());
    const customerDetails = {
      customerId: customerId,
      commission: commission,
      start: startD,
      end: end,
      fullName: fullName,
      phone: phone,
    };
    dispatch(setAciveCustomer(customerDetails));

    // props.navigation.setParams({
    //   stopFromBackB: "Hello",
    // });

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const run = () => {
    //props.navigation.setParams({ cFunction: stop() });
    //props.navigation.setParams({isHeaderShow: true});
    if (updateM === 60) {
      updateH++;
      updateM = 0;
    }
    if (updateS === 60) {
      updateM++;
      updateS = 0;
    }
    if (updateMs === 60) {
      updateS++;
      updateMs = 0;
    }
    updateMs++;
    return setTime({ ms: updateMs, s: updateS, m: updateM, h: updateH });
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const resume = () => start();

  return (
    <LinearGradient
      colors={["#021618", "#021618", "#021618", "#04506f", "#01a0ac"]}
      style={styles.gradient}
    >
      <ScrollView>
        <View style={styles.authContainer}>
          <View style={styles.item}>
            <LinearGradient
              colors={["#021618", "#021618", "#04506f", "#0BA29F", "#fff"]}
              style={styles.gradient}
            >
              
              <View style={styles.imageOuterContainer}>
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={TripImage} />
                </View>
              </View>
              <View style={styles.details}>
              <View>
                <Text>Click Back button!</Text>
              </View>
                <Text style={{ ...styles.textWhite, ...styles.myName }}>
                  {fullName}
                </Text>
                <Text style={styles.textWhite}>Phone: {phone}</Text>
                <Text style={styles.textWhite}>Start: {startD}</Text>
                <Text style={styles.textWhite}>End: {end}</Text>
                <Text style={styles.textWhite}>Trip Charge: {commission}</Text>
              </View>
              <View style={styles.actions}>
                <BtnComponent
                  status={status}
                  start={start}
                  stop={stop}
                  reset={reset}
                  resume={resume}
                />
                {status === 0 || status === 1 || status === 2 ? (
                  <DisplayComponent time={time} />
                ) : null}
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

Trip.navigationOptions = ({ navigation }) => ({
  //don't forget parentheses around the object notation
  headerStyle: {
    backgroundColor: Colors.peacockBlue,
  },
  //title: navigation.getParam("headerTitle"),
  title: "Trip Screen",

  // headerLeft: () => (
  //   <HeaderBackButton
  //     onPress={() => {
  //       console.log("Before Delay");
  //       //navigation.getParam("stopFromBackB");
  //       //navigation.state.params.cFunction;
  //       //navigation.getParam("cFunction")
  //       setTimeout(() => {
  //         navigation.goBack(null);
  //         console.log("Delay");
  //       }, 2000);
  //     }}
  //   />
  // ),
});

// Trip.navigationOptions = ({ navigationData }) => {
//   return {
//     headerStyle: {
//       backgroundColor: Colors.peacockBlue,
//     },
//     // headerRight: () => (
//     //   <Button
//     //     onPress={() => console.log("This is a button!")}
//     //     title="Infoo"
//     //     color="#000"
//     //   />
//     // ),
//     // headerLeft: () => (
//     //   <HeaderBackButton
//     //     onPress={() => {
//     //       //navigationData.navigate(null);
//     //       navigationData.goBack(null);
//     //       console.log("Back Presses");
//     //     }}
//     //   />
//     // ),
//     // headerLeft: () => (
//     //   <HeaderBackButton
//     //     onPress={() => {
//     //       console.log("This is back button!");
//     //       navigationData.goBack(null);
//     //     }}
//     //   />
//     // ),
//     // headerLeft: () => (
//     //   <HeaderBackButton onPress={() => navigationData.goBack(null)} />
//     // ),
//   };
// };

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  gradient: {
    flex: 1,
  },
  item: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    width: 300,
    paddingBottom: 50,
  },
  imageContainer: {
    width: 160,
    height: 160,
    alignItems: "center",
    overflow: "hidden",

    borderRadius: 100,
  },
  imageOuterContainer: {
    width: "100%",
    alignItems: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  details: {
    alignItems: "center",
    padding: 10,
    minHeight: 160,
  },
  textWhite: {
    color: "#fff",
    fontSize: 16,
    textTransform: "capitalize",
  },
  myName: {
    color: "#A7BFC5",
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  actions: {
    flex: 1,
    display: "flex",
    // flexDirection: "row",
    justifyContent: "space-around",
    //alignItems: "center",
    // width: "100%",
    // marginBottom: 50,
  },
  customGradient: {
    borderRadius: 10,
    minWidth: 130,
  },
});

export default Trip;
