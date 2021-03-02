import { create } from "axios";
import { auth, baseURL } from "../../firebase";

import { SET_CUSTOMERS } from "../types";

import customers from "../../models/customers";

const API = create({
  baseURL: baseURL,
  timeout: 60000,
  "Content-Type": "application/json",
});

export const getCustomers = () => {
  return async (dispatch) => {
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await API({
        url: "customers",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = await response.data.customer;
      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new customers(
            key,
            resData[key].username,
            resData[key].start,
            resData[key].end,
            resData[key].createdAt,
            resData[key].distance,
            resData[key].fullName,
            resData[key].phone,
          )
        );
      }

      dispatch({ type: SET_CUSTOMERS, payload: loadedOrders });
    } catch (error) {
      dispatch({ type: SET_CUSTOMERS, payload: [] });
      console.log(error);
      throw error;
    }
  };
};

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
