import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";
import { withOrientation } from "react-navigation";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import Colors from '../constants/Color';


import HeaderButton from "../components/UI/HeaderButton";
import { updateDriverLocation } from "../api"
import { getDriverLocation, getDriverLocations, updateDriverLocation as updateDriverLocationFirebase, auth } from "../firebase";

const ProfileOverViewScreen = props => {
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  let locationSubscription = null

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      // Fetch location
      locationSubscription = await Location.watchPositionAsync(
        {
          distanceInterval: 5 // in meters
        }, onLocationChangeCallback
      )
    })();

    getDriverLocations().onSnapshot((docs) => {
      docs.forEach(doc => {
        const data = doc.data()
        //console.log("Doc data ", data)
      });
    })

    // Replace this with DocId to observe
    const docId = auth.currentUser?.uid || '123'

    getDriverLocation(docId).onSnapshot((doc) => {
      const data = doc.data()
      //console.log("Single doc data ", data)
    })

    return () => locationSubscription?.remove() // remove listner on unmount
  }, []);

  const onLocationChangeCallback = (data) => {
    const location = {
      lat: data?.coords?.latitude,
      long: data?.coords?.longitude
    }
    setLocation(location);
    try {
      // Update firebase async // comment this one
      updateDriverLocation({ location })
      // This should be the bettter approach
      updateDriverLocationFirebase(auth.currentUser?.uid, { location })
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }



  return (
    <View style={styles.welcomeView}>
      <MapView
        style={styles.mapStyle}
        showsUserLocation
        region={{
          latitude: location.lat,
          longitude: location.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

ProfileOverViewScreen.navigationOptions = navData => {
  return {
    headerTitle: "Knight Rider Cab Service",
    headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>,
      headerStyle: {
        backgroundColor: Colors.primary
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
    height: 100
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default ProfileOverViewScreen;
