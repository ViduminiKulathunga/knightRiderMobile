import React, { useState, useEffect, useRef } from "react";
import { View, Text, Alert, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Color";
import Card from "../components/UI/Card";
import HeaderButton from "../components/UI/HeaderButton";
import { Ionicons } from "@expo/vector-icons";

import { getDrunkenStatus } from "../firebase";

import { restUser } from "../store/actions/auth";
import Logo from "../assets/images/4.gif";

const NoService = (props) => {
  const [displayDrunkenMessage, setDisplayDrunkenMessage] = useState();
  const [displayLoginMessage, setDisplayLoginMessage] = useState();
  const [displayActiveMessage, setDisplayActiveMessage] = useState();
  const [status, setStatus] = useState("");
  //const [driverRfid, setDriverRfid] = useState("");

  //const dispatch = useDispatch();

  let userRfid = useSelector((state) => state.auth.userRfid);

  useEffect(() => {
    console.log("Read Before");
    let isCancelled = false;
    if (!isCancelled) {
      console.log("Read After");
      const rfidId = userRfid;

      // getDrunkenStatus(rfidId).onSnapshot((doc) => {
      //   const data = doc.data();
      //   //console.log("Single doc data ", data);
      //   if (data.status !== "logout") {
      //     //const drunken = data.active && !data.drunken;
      //     const drunken = !data.active && data.drunken;
      //     if (drunken) {
      //       setDisplayDrunkenMessage(drunken);
      //       setStatus("drunken");
      //     }

      //     const login = !data.active && !data.drunken;
      //     if (login) {
      //       setDisplayLoginMessage(login);
      //       setStatus("login");
      //     }

      //     const active = data.active && !data.drunken;
      //     if (active) {
      //       setDisplayActiveMessage(active);
      //       setStatus("active");
      //     }
      //   }
      // });
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
      colors={["#021618", "#04506f", "#01a0ac", "#fff", "#fff", "#fff", "#fff"]}
      style={styles.gradient}
    >
      <View style={styles.topContainer}>
        <Text style={styles.HeadingText}>Service </Text>
        <Text style={styles.HeadingText}>Unavailable</Text>
      </View>

      <Card style={styles.authContainer}>
        <View style={styles.logoWrapper}>
          <View style={styles.imageContainer}>
            <Image style={styles.logo} source={Logo} />
          </View>
        </View>
        <View style={styles.UserView}>
          <View style={styles.textCenter}>
            <Text
              style={styles.buttonText}
              // onPress={() => {
              //   props.navigation.navigate({
              //     routeName: "Activate",
              //   });
              // }}
              onPress={props.onSelectActivate}
            >
              Activate Service
            </Text>
            <Text style={styles.myName}>
              Please Active Your Service. Click Here...
            </Text>
          </View>
        </View>
      </Card>
    </LinearGradient>
  );
};

NoService.navigationOptions = (navData) => {
  return {
    headerTitle: "",
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
      backgroundColor: "#021618",
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  authContainer: {
    width: "100%",
    maxHeight: 300,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 40,
    paddingBottom: 40,
    // justifyContent: "center",
    justifyContent: "flex-end",
    shadowColor: "white",
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    elevation: 0,
    borderRadius: 0,
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    maxHeight: 300,
    justifyContent: "center",
    top: -170,
    alignItems: "center",
  },
  UserView: {
    padding: 0,
    height: 200,
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
  HeadingText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 23,
  },
  icon: { marginBottom: 7 },
  logoWrapper: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: -100,
    borderRadius: 100,
  },
  logo: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
    color: "#ffffff",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.primary,
    fontSize: 19,
    borderRadius: 20,
  },
  myName: {
    // color: "#A7BFC5",
    color: Colors.gray,
    fontSize: 14,
    textTransform: "capitalize",
    marginTop: 12,
  },
});

export default NoService;
