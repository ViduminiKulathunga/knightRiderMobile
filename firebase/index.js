import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC79EBEgrIGKpJH1EJY37Dcn2Uo6OwVcFk",
  authDomain: "knight-rider-cabs.firebaseapp.com",
  databaseURL: "https://knight-rider-cabs.firebaseio.com",
  projectId: "knight-rider-cabs",
  storageBucket: "knight-rider-cabs.appspot.com",
  messagingSenderId: "584765511924",
  appId: "1:584765511924:web:63a07ed91724165f99a6a1",
  measurementId: "G-TF44SL3HTR",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

firestore.settings({ experimentalForceLongPolling: true });

const baseURL = "https://us-central1-knight-rider-cabs.cloudfunctions.net/api/";

const getDriverLocation = (driverId) =>
  firestore.collection("location").doc(driverId);

const updateDriverLocation = (docId, data) =>
  firestore.collection("location").doc(docId).set(data);

const getDriverLocations = () => firestore.collection("location");

const getDrunkenStatus = (rfidId) =>
  firestore.collection("driverlog").doc(rfidId);

const getDriverLog = (handle) => firestore.collection("userlog").doc(handle);

const updateLoginStatus = (rfid) =>
  firestore.collection("driverlog").doc(rfid).update({
    status: "login",
    login: true
  });

const updateLogOutStatus = (rfid) =>
  firestore.collection("driverlog").doc(rfid).update({
    status: "logout",
    active: false,
    login: false,
    hasPassenger: false,
    tripId: ""
  });

const updateTripAccepted = (customerId) =>
  firestore.collection("customers").doc(customerId).update({
    status: "accepted",
  });

const updateDriverlogOnDB = (rfid, dataDriverLog) =>
  firestore.collection("driverlog").doc(rfid).update({
    hasPassenger: true,
    tripId: dataDriverLog.tripId,
  });

const updateTripOnDB = (tripId, dataTrip) =>
  firestore.collection("trip").doc(tripId).update({
    hasPassenger: true,
    status: "started",
    tripCharge: dataTrip.tripCharge,
    startTime: new Date().toISOString(),
  });

const updateTripOffDB = (tripId) =>
  firestore.collection("trip").doc(tripId).update({
    hasPassenger: false,
    status: "end",
    endTime: new Date().toISOString(),
  });

const updateDriverlogFinishTrip = (rfid) =>
  firestore.collection("driverlog").doc(rfid).update({
    hasPassenger: false,
    tripId: "",
    alcoholID: ""
  });

// const getTripDetails = async (tripId) => {
//   try {
//     const tripRef = firestore.collection("trip").doc(tripId);
//     const snapshot = await tripRef.get();
//     snapshot.forEach((doc) => {
//       console.log(doc.id, "=>", doc.data());
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// const getCustomersF = () =>
//   firestore
//     .collection("customers")
//     .orderBy("createdAt", "desc")
//     .where("status", "==", "active")
//     .get();

const getCustomersF = () => {
  return async () => {
    // use await here
    await firestore
      .collection("customers")
      .where("status", "==", "active")
      .get();
  };
};

//const x = () => firestore.collection("customers").get();

// const citiesRef = firestore.collection("customers");
// const snapshot = await citiesRef.where("status", "==", "active").get();

let query = firestore.collection("customers").where("status", "==", "active");

// const x = () => query.get().then(querySnapshot => {
//   console.log("Hell0");
//   //console.log(querySnapshot);
//   querySnapshot.forEach(documentSnapshot => {
//     console.log(`Found document at ${documentSnapshot.ref.path}`);
//   });
// });

const x = () => query;

export {
  firestore,
  baseURL,
  auth,
  getDriverLocation,
  getDriverLocations,
  updateDriverLocation,
  getDrunkenStatus,
  getDriverLog,
  updateLoginStatus,
  updateLogOutStatus,
  updateTripAccepted,
  getCustomersF,
  x,
  updateTripOnDB,
  updateDriverlogOnDB,
  updateDriverlogFinishTrip,
  updateTripOffDB,
};
