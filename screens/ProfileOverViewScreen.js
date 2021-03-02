import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { withOrientation } from "react-navigation";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Colors from "../constants/Color";

import HeaderButton from "../components/UI/HeaderButton";
import { updateDriverLocation } from "../api";
import {
  getDriverLocation,
  getDriverLocations,
  updateDriverLocation as updateDriverLocationFirebase,
  auth,
} from "../firebase";

import { setDriverStatus } from "../store/actions/data";

const ProfileOverViewScreen = (props) => {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  const [isLoading, setLoading] = useState(false);
  let locationSubscription = null;

  const dispatch = useDispatch();
  const driverStatus = useSelector((state) => state.data.driverStatus);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      setLoading(true);
      // Fetch location
      locationSubscription = await Location.watchPositionAsync(
        {
          distanceInterval: 5, // in meters
        },
        onLocationChangeCallback
      );
    })();

    // console.log(driverStatus, " Test first render before");
    // dispatch(setDriverStatus("login"));
    // console.log(driverStatus, " Test first render aftter");

    getDriverLocations().onSnapshot((docs) => {
      docs.forEach((doc) => {
        const data = doc.data();
        //console.log("Doc data ", data)
      });
    });

    // Replace this with DocId to observe
    const docId = auth?.currentUser?.uid ?? "123";

    getDriverLocation(docId).onSnapshot((doc) => {
      const data = doc.data();
      //console.log("Single doc data ", data)
    });

    return () => locationSubscription?.remove(); //Clean up // remove listner on unmount
  }, []);

  const onLocationChangeCallback = (data) => {
    const location = {
      lat: data?.coords?.latitude,
      long: data?.coords?.longitude,
    };
    setLocation(location);
    setLoading(false);
    try {
      // Update firebase async another method
      updateDriverLocation({ location });
      // Bettter approach
      //updateDriverLocationFirebase(auth.currentUser?.uid, { location })
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  return (
    <View style={styles.welcomeView}>
      {isLoading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <MapView
          style={styles.mapStyle}
          showsUserLocation
          region={{
            latitude: location.lat || 0,
            longitude: location.long || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )}
    </View>
  );
};

ProfileOverViewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Knight Rider Cab Service",
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
  welcomeView: {
    padding: 10,
    backgroundColor: "#20B2AA",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default ProfileOverViewScreen;
