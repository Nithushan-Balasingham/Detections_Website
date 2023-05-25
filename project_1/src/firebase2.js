// import firebase from 'firebase/compat/app';
// import 'firebase/compat/database';


// // Your web app's Firebase configuration
// const firebaseConfigdb = {
//   apiKey: "AIzaSyAwkjZaB1GsRZ628HaLAOth24K10__Sxig",
//   authDomain: "auth-dev-64191.firebaseapp.com",
//   databaseURL: "https://auth-dev-64191-default-rtdb.firebaseio.com",
//   projectId: "auth-dev-64191",
//   storageBucket: "auth-dev-64191.appspot.com",
//   messagingSenderId: "649158225521",
//   appId: "1:649158225521:web:5c5de98888cdb3319eb5d0"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfigdb);

// // Function to fetch data from Firebase
// export const fetchDataFromFirebase = (setData) => {
//   // Get a reference to the 'drowsiness' collection in Firebase Realtime Database
//   const databaseRef = firebase.database().ref('drowsiness');

//   // Attach a listener to the 'value' event to fetch the data
//   databaseRef.on('value', (snapshot) => {
//     const fetchedData = snapshot.val();

//     // Convert the fetched data into an array and update the state
//     const dataArray = Object.values(fetchedData);
//     setData(dataArray);
//   });

//   // Clean up the listener when no longer needed
//   return () => {
//     databaseRef.off('value');
//   };
// };