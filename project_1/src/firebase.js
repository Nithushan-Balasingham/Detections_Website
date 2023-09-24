import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAuGQOw-qRlp44S20Vh9XuywAoK0AwIWTk",
  authDomain: "final-fb73b.firebaseapp.com",
  projectId: "final-fb73b",
  databaseURL: "https://final-fb73b-default-rtdb.firebaseio.com",
  storageBucket: "final-fb73b.appspot.com",
  messagingSenderId: "744156397539",
  appId: "1:744156397539:web:bbc6e27b1570258470ead6",
  measurementId: "G-R9C6JR7R2Z"
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
