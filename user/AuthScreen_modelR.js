import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Text,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import Colors from "../constants/Color";
import * as authActions from "../store/actions/auth";
import Logo from "../assets/images/logo.jpeg";
import AlertCtm from "../components/Alert/AlertCtm";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [alertBox, setAlertBox] = useState(false);
  const [overlay, setOverlay] = useState(true);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandlerSubmit = () => {
    let str = formState.inputValues.email;
    //str.match(/dknight@gmail.com/g)
    if (str.match(/kasun@gmail.com/g)) {
      let action;
      (async () => {
        action = authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        );
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(action);
          props.navigation.navigate("Menu");
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      })();
    } else if (
      str.match(/knight@gmail.com/g) ||
      (formState.inputValues.email !== "" &&
        formState.inputValues.password !== "")
    ) {
      setOverlay(true);
      setAlertBox(true);

      console.log("Working");
      //Alert.alert("Unauthorized Access", error, [{ text: "Okay" }]);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient
        colors={["#021618", "#04506f", "#01a0ac"]}
        style={styles.gradient}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <View style={styles.logoWrapper}>
              <Image style={styles.logo} source={Logo} />
            </View>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {alertBox ? (
              <View
                style={overlay ? styles.overlayShown : styles.overlayHidden}
              >
                <AlertCtm
                  removeOverlay={() => {
                    setOverlay(false);
                    setAlertBox(false);
                  }}
                />
              </View>
            ) : null}

            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                // <Button
                //   title="Login"
                //   color={Colors.primary}
                //   onPress={authHandler}
                // />

                <LinearGradient
                  colors={["#052C3B", "#052C3B"]}
                  // colors={[
                  //   "rgb(8 ,20 ,84)",
                  //   "rgb(38,189,206)",
                  //   "rgb(247 ,292 ,1)",
                  // ]}
                  style={styles.linearGradientButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.buttonText} onPress={authHandlerSubmit}>
                    {" "}
                    Login{" "}
                  </Text>
                </LinearGradient>
              )}
            </View>
            {/* <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                color={Colors.peacock}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View> */}
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
  headerStyle: {
    backgroundColor: Colors.peacockBlue, //"#0A98AF"//"#021121", //Colors.primary//"#042226", //"#031a1d",
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradientXX: {
    backgroundColor: "transparent",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  linearGradientButton: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  logoWrapper: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  overlayShown: {
    opacity: 1,
  },
  overlayHidden: {
    display: "none",
    opacity: 0,
  },
});

export default AuthScreen;
