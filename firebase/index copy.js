import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyC79EBEgrIGKpJH1EJY37Dcn2Uo6OwVcFk",
    authDomain: "knight-rider-cabs.firebaseapp.com",
    databaseURL: "https://knight-rider-cabs.firebaseio.com",
    projectId: "knight-rider-cabs",
    storageBucket: "knight-rider-cabs.appspot.com",
    messagingSenderId: "584765511924",
    appId: "1:584765511924:web:63a07ed91724165f99a6a1",
    measurementId: "G-TF44SL3HTR"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();


const getDriverLocation = (driverId) => firestore.collection('location').doc(driverId);
const updateDriverLocation = (docId, data) => firestore.collection('location').doc(docId).set(data);
const getDriverLocations = () => firestore.collection('location');

export {
    auth,
    getDriverLocation,
    getDriverLocations,
    updateDriverLocation
}