import { AUTHENTICATE, LOGOUT, SET_USERPROFILE, RESETUSER } from "../types";

const initialState = {
  userId: null,
  credentials: {},
  userRfid: "",
  userHandle: "",
  //token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        userId: action.userId,
        //token: action.token,
      };
    case SET_USERPROFILE:
      console.log();
      return {
        ...state,
        credentials: action.payload,
        userRfid: action.payload.credentials.rfid,
        userHandle: action.payload.credentials.handle,
      };
    case LOGOUT:
      console.log(initialState, " InitialState in Auth Reducer");
      return initialState;
    default:
      return state;
  }
};
