import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";
import { auth, getDrunkenStatus } from "../firebase";

import Colors from "../constants/Color";
import * as authActions from "../store/actions/auth";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await auth.currentUser;
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const token = await auth.currentUser.getIdToken()
      dispatch(authActions.authenticate(auth.currentUser.uid, token));
      
    };

    tryLogin();
  }, [dispatch]);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     props.navigation.navigate(user ? "Home" : "Auth");
  //   });
  // }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
