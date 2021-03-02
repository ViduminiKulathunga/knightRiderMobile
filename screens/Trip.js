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
import Gold from "../assets/images/gold.jpg";

import BtnComponent from "../components/Trip/BtnComponent";
import DisplayComponent from "../components/Trip/DisplayComponent";

import { HeaderBackButton } from "react-navigation-stack";

import {
  updateTripAccepted,
  updateTripOnDB,
  updateDriverlogOnDB,
  updateDriverlogFinishTrip,
  updateTripOffDB,
} from "../firebase";

import {
  setAciveCustomer,
  setTrip,
  setOnTrip,
  setTripStatus,
  setCommission,
  resetAciveCustomer,
  getTripDetails,
  postDriverCommission,
  setDrunkenOnTripLocal,
} from "../store/actions/data";

const Trip = (props) => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [customerRef, setCustomerRef] = useState(null);

  const dispatch = useDispatch();
  const customerID = useSelector((state) => state.data.customerID);
  const stateStatus = useSelector((state) => state.data.stateStatus);
  const userRfid = useSelector((state) => state.auth.userRfid);
  const tripId = useSelector((state) => state.data.tripId);
  const customer = useSelector((state) => state.data.customer);
  const driverDrunkenStatusOnTrip = useSelector(
    (state) => state.data.driverDrunkenStatusOnTrip
  );
  const driverDrunkenStatusOnTripLocal = useSelector(
    (state) => state.data.driverDrunkenStatusOnTripLocal
  );
  const loadingData = useSelector((state) => state.data.loadingData);

  const customerId = props.navigation.getParam("customerId");
  const startD = props.navigation.getParam("start");
  const end = props.navigation.getParam("end");
  const commission = props.navigation.getParam("commission");
  const fullName = props.navigation.getParam("fullName");
  const phone = props.navigation.getParam("phone");

  const start = () => {
    setStatus(1);
    dispatch(setTripStatus(1));
    const dataTrip = {
      tripCharge: customer.commission,
    };

    const dataDriverLog = {
      tripId: tripId,
    };
    updateDriverlogOnDB(userRfid, dataDriverLog);
    updateTripOnDB(tripId, dataTrip);
  };

  const calculateDriverCommision = () => {
    let receivedCommision = "";
    let commission = customer.commission;
    console.log(loadingData, " Trip loadingData");
    if (!loadingData) {
      console.log(driverDrunkenStatusOnTrip, " Trip driverDrunkenStatusOnTrip");
      if (driverDrunkenStatusOnTrip || driverDrunkenStatusOnTripLocal) {
        receivedCommision = commission * 0.75;
      } else {
        receivedCommision = commission;
      }

      const commissionRef = {
        receivedCommision: receivedCommision,
        commission: commission,
      };
      dispatch(postDriverCommission(commissionRef, tripId));
      setDisableButton(false);
    }
  };

  const stop = () => {
    setStatus(2);
    dispatch(setTripStatus(2));
    setDisableButton(true);
    dispatch(getTripDetails(tripId));
  };

  useEffect(() => {
    console.log("tripId tripId ", tripId);
    console.log(" userRfid userRfid ", userRfid);
    const customerIdRef = {
      customerId: customerId,
    };

    if (customerID === "") {
      updateTripAccepted(customerId);
      setStatus(0);
      dispatch(setTripStatus(0));
      dispatch(setOnTrip(customerIdRef));
      const customerDetails = {
        customerId: customerId,
        commission: commission,
        start: startD,
        end: end,
        fullName: fullName,
        phone: phone,
      };
      dispatch(setAciveCustomer(customerDetails));
      console.log("Running IF");
    } else {
      console.log("Running Else");
      setStatus(stateStatus);
      console.log(stateStatus, "stateStatus stateStatus IFFF");
    }
  }, []);

  const reset = () => {
    setStatus(3);
    calculateDriverCommision();
    updateDriverlogFinishTrip(userRfid);
    updateTripOffDB(tripId);
    console.log("Reset working anyhow");
    dispatch(setTripStatus(-1));
    dispatch(resetAciveCustomer());
    dispatch(setDrunkenOnTripLocal(false));
  };

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
              {status !== 3 ? (
                <View>
                  <View style={styles.imageOuterContainer}>
                    <View style={styles.imageContainer}>
                      <Image style={styles.image} source={TripImage} />
                    </View>
                  </View>
                  <View style={styles.details}>
                    <Text style={{ ...styles.textWhite, ...styles.myName }}>
                      {fullName}
                    </Text>
                    <Text style={styles.textWhite}>Phone: {phone}</Text>
                    <Text style={styles.textWhite}>Start: {startD}</Text>
                    <Text style={styles.textWhite}>End: {end}</Text>
                    <Text style={styles.textWhite}>
                      Trip Charge: {commission}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.imageOuterContainer}>
                    <View style={styles.imageContainer}>
                      <Image style={styles.image} source={Gold} />
                    </View>
                  </View>
                  <View style={{ ...styles.details, ...styles.detailsCenter }}>
                    <Text
                      style={{ ...styles.textWhite, ...styles.myNameWhite }}
                    >
                      Your Trip
                    </Text>
                    <Text
                      style={{ ...styles.textWhite, ...styles.myNameWhite }}
                    >
                      Completed Successfully
                    </Text>
                  </View>
                </View>
              )}

              <View style={styles.actions}>
                <BtnComponent
                  status={status}
                  start={start}
                  stop={stop}
                  reset={reset}
                  newCustomerWindow={() => props.navigation.goBack(null)}
                  disableButton={disableButton}
                  disableButton={false}
                  // newCustomerWindow={() =>
                  //   {props.navigation.navigate({ routeName: "User" });}
                  // }
                />
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
  title: "Trip Screen",
});

// //Dynamically pass titile
// Trip.navigationOptions = (navigationData) => {
//   const customerId = navigationData.navigation.getParam("customerId");
//   return {
//     headerTitle: customerId,
//     headerStyle: {
//        backgroundColor: Colors.peacockBlue,
//     },
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
  detailsCenter: {
    justifyContent: "center",
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
  myNameWhite: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  customGradient: {
    borderRadius: 10,
    minWidth: 130,
  },
});

export default Trip;
