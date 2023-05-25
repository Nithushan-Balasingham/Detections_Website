import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBz_WqN-gXmAmzlOmjImiP-REg8tSr0BwE",
  authDomain: "fyp-project-a415d.firebaseapp.com",
  databaseURL: "https://fyp-project-a415d-default-rtdb.firebaseio.com",
  projectId: "fyp-project-a415d",
  storageBucket: "fyp-project-a415d.appspot.com",
  messagingSenderId: "414751786501",
  appId: "1:414751786501:web:3b610c314ee48ccef33e6c"
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
export const auth =getAuth()
export default database

// export const fetchDataFromFirebase = (setData) => {
//   // Get a reference to the 'drowsiness' collection in Firebase Realtime Database
//   const databaseRef = database.ref('drowsiness');

//   // Attach a listener to the 'value' event to fetch the data
//   databaseRef.on('value', (snapshot) => {
//     const fetchedData = snapshot.val();

//     // Convert the fetched data into an array and update the state
//     const dataArray = Object.values(fetchedData);
//     setData(dataArray);
//   });

//   // Clean up the listener when the component unmounts
//   return () => {
//     databaseRef.off('value');
//   };
// };
