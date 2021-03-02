import { create } from "axios";
import { auth, baseURL } from "../../firebase";

import {
  SET_CUSTOMERS,
  SET_ACTIVE_CUSTOMER,
  SET_TRIP,
  SET_COMMISSION,
  SET_ON_TRIP,
  SET_OFF_TRIP,
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

      // const token = await auth.currentUser.getIdToken();
      // const response = await API({
      //   url: "trip",
      //   method: "POST",
      //   body:  JSON.stringify(data),
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // const resData = await response;
      // console.log(resData, " Generated Trip is");
      //dispatch({ type: SET_TRIP, payload: resData });
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

export const setAciveCustomer = (customer) => (dispatch) => {
  dispatch({ type: SET_ACTIVE_CUSTOMER, payload: customer });
};

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
