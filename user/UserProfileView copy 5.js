import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, Platform, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { getCustomers } from "../store/actions/data";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../constants/Color";

import HeaderButton from "../components/UI/HeaderButton";

import {  getDrunkenStatus, auth,  getDriverLocation} from "../firebase";

const UserProfileView = (props) => {
  const [error, setError] = useState();

  const customers = useSelector((state) => state.data.customers);
  const dispatch = useDispatch();

  const loadCustomers = useCallback(async () => {
    console.log("Woring");
    setError(null);
    try {
      await dispatch(getCustomers());
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, setError]);

  //{console.log(customers, " Hello")}
  useEffect(() => {
    // dispatch(getCustomers());
    //console.log(getCustomers());
    //loadCustomers
    // const willFocusSub = props.navigation.addListener(
    //   "willFocus",

    // );

    // return () => {
    //   willFocusSub.remove();
    // };

    // let rfidId = "knight_KB4R8CJF4TR5W";
    // getDrunkenStatus(rfidId).onSnapshot((doc) => {
    //   const data = doc.data();
    //   console.log("Single doc data ", data);
    // });

    const docId = auth?.currentUser?.uid ?? '123'

    getDriverLocation(docId).onSnapshot((doc) => {
      const data = doc.data()
      console.log("Single doc data ", data)
    })

    const rfidId = "knight_KB4R8CJF4TR5W";
      getDrunkenStatus(rfidId).onSnapshot((doc) => {
        const data = doc.data();
        console.log("Single doc data ", data);
      });
  }, []);

  if (error) {
    return (
      <View>
        <Text>An Error Occured!</Text>
        <Button
          title="Try again"
          onPress={loadCustomers}
          color={Colors.primary}
        />
      </View>
    );
  }

  return (
    <View style={styles.UserView}>
      <Text style={{ color: "white", fontSize: 20 }}>User Details</Text>
      <Button
        title="Go to Meals!"
        onPress={() => {
          props.navigation.navigate({ routeName: "Home" });
        }}
      />
      <Button
        title="Go Back!"
        onPress={() => {
          props.navigation.pop();
        }}
      />
    </View>
  );
};

UserProfileView.navigationOptions = (navData) => {
  return {
    headerTitle: "User Profile",
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
  UserView: {
    padding: 10,
    backgroundColor: "#87CEFA",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default UserProfileView;
