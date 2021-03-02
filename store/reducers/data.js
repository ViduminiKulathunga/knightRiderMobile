import {
  SET_CUSTOMERS,
  SET_OFF_TRIP,
  SET_ON_TRIP,
  SET_TRIP_STATUS,
  SET_TRIP,
  SET_ACTIVE_CUSTOMER,
  RESET_ACTIVE_CUSTOMER,
  SET_DRUNKEN_STATUS,
  SET_DRUNKEN_STATUS_LOCAL,
  LOADING_DATA,
  SET_DRIVER_STATUS,
  SET_REMOVE_CUSTOMERS,
  LOGOUT,
} from "../types";

const initialState = {
  customers: [],
  customer: {},
  customerID: "",
  loading: false,
  loadingData: false,
  onTrip: false,
  tripId: "",
  // stateStatus: 0,
  stateStatus: null,
  driverDrunkenStatusOnTrip: null,
  driverDrunkenStatusOnTripLocal: null,
  driverStatus: "logout",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
        loading: false,
      };
    case SET_ON_TRIP:
      return {
        ...state,
        onTrip: true,
      };
    case SET_OFF_TRIP:
      return {
        ...state,
        onTrip: false,
      };
    case SET_ACTIVE_CUSTOMER:
      return {
        ...state,
        customerID: action.payload.customerId,
        customer: action.payload,
      };
    case RESET_ACTIVE_CUSTOMER:
      return {
        ...state,
        customerID: "",
        customer: {},
        tripId: "",
      };
    case SET_TRIP:
      console.log("stateStatus SET_TRIP ", state.stateStatus);
      return {
        ...state,
        tripId: action.payload.tripId,
      };
    case SET_TRIP_STATUS:
      return {
        ...state,
        stateStatus: action.payload,
      };
    case SET_DRUNKEN_STATUS:
      console.log("Working Here driverDrunkenStatusOnTrip", action.payload);
      return {
        ...state,
        driverDrunkenStatusOnTrip: action.payload,
        loadingData: false,
      };
    case SET_DRUNKEN_STATUS_LOCAL:
      return {
        ...state,
        driverDrunkenStatusOnTripLocal: action.payload,
      };
    case LOADING_DATA:
      console.log("Working Here loadingData Reducer");
      return {
        ...state,
        loadingData: true,
      };
    case SET_DRIVER_STATUS:
      return {
        ...state,
        driverStatus: action.payload,
      };
    case SET_REMOVE_CUSTOMERS:
      return {
        ...state,
        customers: [],
      };
    case LOGOUT:
      console.log(initialState, " InitialState in Data Reducer");
      return initialState;
    default:
      return state;
  }
};
