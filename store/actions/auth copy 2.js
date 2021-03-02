import { AsyncStorage } from "react-native";
import { auth } from "../../firebase";

/* export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN"; */
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

export const signup = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      dispatch(authenticate(response.user.uid, resData.idToken));
    } catch (error) {
      throw new Error(error?.message || "User registration failed");
    }
  };
};

// export const login = (email, password) => {
//   return async dispatch => {
//     try {
//       const response = await auth.signInWithEmailAndPassword(email, password);
//       dispatch(authenticate(response.user.uid, ''));
//     } catch (error) {
//       throw new Error(error?.message || 'Authenticating user failed');
//     }
//   };
// };

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      //console.log(response);
      dispatch(authenticate(response.user.uid, ""));

      saveDataToStorage(response.user.uid);
    } catch (error) {
      throw new Error(error?.message || "Authenticating user failed");
    }
  };
};

const saveDataToStorage = (userId) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId: userId,
    })
  );
};

export const logout = () => {
  return async (dispatch) => {
    await auth.signOut();
    dispatch({ type: LOGOUT });
  };
};
