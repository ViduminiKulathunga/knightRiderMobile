import { create } from "axios";
import { auth, baseURL } from "../../firebase";

import {
  SET_CUSTOMERS,
  SET_ACTIVE_CUSTOMER,
  SET_TRIP,
  SET_COMMISSION,
  SET_ON_TRIP,
  SET_TRIP_STATUS,
  SET_OFF_TRIP,
  RESET_ACTIVE_CUSTOMER,
  SET_DRUNKEN_STATUS,
  SET_DRUNKEN_STATUS_LOCAL,
  SET_DRIVER_STATUS,
  LOADING_DATA,
  SET_REMOVE_CUSTOMERS,
} from "../types";

import customers from "../../models/customers";

const API = create({
  baseURL: baseURL,
  timeout: 60000,
  "Content-Type": "application/json",
});

// export const getCustomers = () => {
//   return async (dispatch) => {
//     try {
//       const token = await auth.currentUser.getIdToken();
//       const response = await API({
//         url: "customers",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const resData = await response.data.customer;
//       const loadedOrders = [];

//       for (const key in resData) {
//         loadedOrders.push(
//           new customers(
//             key,
//             resData[key].userId,
//             resData[key].username,
//             resData[key].start,
//             resData[key].end,
//             resData[key].createdAt,
//             resData[key].distance,
//             resData[key].fullname,
//             resData[key].phone,
//             resData[key].imageUrl,
//             resData[key].commission,
//           )
//         );
//       }

//       dispatch({ type: SET_CUSTOMERS, payload: loadedOrders });
//     } catch (error) {
//       dispatch({ type: SET_CUSTOMERS, payload: [] });
//       console.log(error);
//       throw error;
//     }
//   };
// };

export const getCustomers = (resDataa) => {
  return async (dispatch) => {
    try {
      const resData = await resDataa;

      const loadedOrders = [];
      //console.log(resData, " resData");
      for (const key in resData) {
        //console.log(key, " resData[key], ", resData[key].userId, " userId");
        loadedOrders.push(
          new customers(
            key,
            resData[key].userId,
            resData[key].username,
            resData[key].start,
            resData[key].end,
            resData[key].createdAt,
            resData[key].distance,
            resData[key].fullname,
            resData[key].phone,
            resData[key].imageUrl,
            resData[key].commission
          )
        );
      }
      //console.log(loadedOrders, " loadedOrders loadedOrders");
      dispatch({ type: SET_CUSTOMERS, payload: loadedOrders });
    } catch (error) {
      dispatch({ type: SET_CUSTOMERS, payload: [] });
      console.log(error);
      throw error;
    }
  };
};

export const setOnTrip = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_ON_TRIP });
      const token = await auth.currentUser.getIdToken();

      const response = await API({
        url: "trip",
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });

      const resData = await response.data;
      console.log(resData, " Generated Trip is");

      dispatch({ type: SET_TRIP, payload: resData });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const setTripStatus = (status) => (dispatch) => {
  console.log(status, "status Inside Action");
  dispatch({ type: SET_TRIP_STATUS, payload: status });
};

export const getTripDetails = (tripId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOADING_DATA });
      const token = await auth.currentUser.getIdToken();
      const response = await API({
        url: `tripstatus/${tripId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = await response.data.drunkenStatus;
      console.log(resData, " resData resData resData");

      dispatch({ type: SET_DRUNKEN_STATUS, payload: resData });
    } catch (error) {
      dispatch({ type: SET_DRUNKEN_STATUS, payload: [] });
      console.log(error);
      throw error;
    }
  };
};

export const setAciveCustomer = (customer) => (dispatch) => {
  dispatch({ type: SET_ACTIVE_CUSTOMER, payload: customer });
};

export const resetAciveCustomer = () => (dispatch) => {
  dispatch({ type: SET_OFF_TRIP });
  dispatch({ type: SET_DRUNKEN_STATUS, payload: false });
  dispatch({ type: RESET_ACTIVE_CUSTOMER });
};

export const setDriverStatus = (status) => (dispatch) => {
  dispatch({ type: SET_DRIVER_STATUS, payload: status });
};

export const setRemoveCustomers = () => (dispatch) => {
  dispatch({ type: SET_REMOVE_CUSTOMERS });
};

export const setDrunkenOnTripLocal = (status) => (dispatch) => {
  dispatch({ type: SET_DRUNKEN_STATUS_LOCAL, payload: status });
};

export const postDriverCommission = (data, tripId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_ON_TRIP });
      const token = await auth.currentUser.getIdToken();

      const response = await API({
        url: `driver/${tripId}`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });

      const resData = await response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

// export const setOnTrip = (dataSend) => {
//   return async (dispatch) => {
//     console.log(" Working for TThere..");
//     console.log(dataSend, " data data" )
//     dispatch({ type: SET_ON_TRIP });

//     const data = {
//       "customerId": dataSend,
//     };

//     console.log(data, " dd");
//     console.log(data.customerId, " dd.customerId");

//     console.log(" Working for here..");
//     try {
//       const token = await auth.currentUser.getIdToken();
//       const response = await API({
//         url: "trip",
//         method: "POST",
//         body:  JSON.stringify(data),
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const resData = await response;
//       console.log(resData, " Generated Trip is");
//       //dispatch({ type: SET_TRIP, payload: resData });
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   };
// };

// export const getCustomers = () => {
//   return async (dispatch) => {
//     try {
//       const token = await auth.currentUser.getIdToken();
//       const response = await API({
//         url: "customers",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const resData = await response.data.customer;
//       const loadedOrders = [];

//       for (const key in resData) {
//         loadedOrders.push(
//           new customers(
//             key,
//             resData[key].userId,
//             resData[key].username,
//             resData[key].start,
//             resData[key].end,
//             resData[key].createdAt,
//             resData[key].distance,
//             resData[key].fullname,
//             resData[key].phone,
//             resData[key].imageUrl,
//             resData[key].commission,
//           )
//         );
//       }

//       dispatch({ type: SET_CUSTOMERS, payload: loadedOrders });
//     } catch (error) {
//       dispatch({ type: SET_CUSTOMERS, payload: [] });
//       console.log(error);
//       throw error;
//     }
//   };
// };

// export const setTrip = (handle, month, year) => (dispatch) => {
//   dispatch({ type: LOADING_UI });
//   axios
//     .get(`/driver/${handle}/${month}/${year}/alcohol`)
//     .then((res) => {
//       dispatch({ type: SET_DRIVER_ALCOHOL_PROFILE, payload: res.data });
//       dispatch({ type: STOP_LOADING_UI });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const setCommission = (handle, month, year) => (dispatch) => {
//   dispatch({ type: LOADING_UI });
//   axios
//     .get(`/driver/${handle}/${month}/${year}/alcohol`)
//     .then((res) => {
//       dispatch({ type: SET_DRIVER_ALCOHOL_PROFILE, payload: res.data });
//       dispatch({ type: STOP_LOADING_UI });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const getCustomers = () => {
//   return async (dispatch) => {
//     try {
//       const token = await auth.currentUser.getIdToken();
//       const response = await API({
//         url: "customers",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       dispatch({ type: SET_CUSTOMERS, payload: response.data });
//     } catch (error) {
//       dispatch({ type: SET_MEMBERS, payload: [] });
//       console.log(error);
//       throw error;
//     }
//   };
// };
