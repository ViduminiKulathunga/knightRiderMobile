import { AsyncStorage } from "react-native";
import { create } from "axios";
import {
  auth,
  baseURL,
  updateLoginStatus,
  updateLogOutStatus,
} from "../../firebase";

import { AUTHENTICATE, LOGOUT, SET_USERPROFILE, RESETUSER } from "../types";

const API = create({
  baseURL: baseURL,
  timeout: 60000,
  "Content-Type": "application/json",
});

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);

      dispatch(authenticate(response.user.uid, ""));

      const token = await auth.currentUser.getIdToken();
      const responseUser = await API({
        url: "userinfo",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: SET_USERPROFILE, payload: responseUser.data });

      if (responseUser.data.credentials.rfid !== "") {
        updateUserLogin(responseUser.data.credentials.rfid);
      }

      saveDataToStorage(responseUser.data.credentials.rfid);
    } catch (error) {
      throw new Error(error?.message || "Authenticating user failed");
    }
  };
};

const updateUserLogin = (rfid) => {
  try {
    // Bettter approach
    //updateDriverLocationFirebase(auth.currentUser?.uid, { location })
    updateLoginStatus(rfid);
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

const saveDataToStorage = (rfid) => {
  AsyncStorage.setItem("rfid", rfid);
};

export const logout = () => {
  return async (dispatch) => {
    let valueId = await AsyncStorage.getItem("rfid");
    dispatch({ type: LOGOUT });
    await auth.signOut();

    logoutUserStatus(valueId);
  };
};

const logoutUserStatus = (userRfid) => {
  try {
    updateLogOutStatus(userRfid);
    console("Logout working well");
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};
