import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
export const auth =getAuth()
export default database
