import {auth} from "../firebase"
import database  from '../firebase';
import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'

const UserContext = createContext()

export const AuthContextProvider =({children})=>{
    const[user,setUser] =useState({})
    const [data, setData] = useState([]);

    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    };
    const signIn = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout = ()=>{
        return signOut(auth)
    }
    // const useFetchDataFromFirebase = () => {
    //     useEffect(() => {
    //       // Get a reference to the 'drowsiness' collection in Firebase Realtime Database
    //       const databaseRef = database.ref('drowsiness');
    
    //       // Attach a listener to the 'value' event to fetch the data
    //       const fetchData = (snapshot) => {
    //         const fetchedData = snapshot.val();
    
    //         // Convert the fetched data into an array and update the state
    //         const dataArray = Object.values(fetchedData);
    //         setData(dataArray);
    //       };
    
    //       databaseRef.on('value', fetchData);
    
    //       // Clean up the listener when the component unmounts
    //       return () => {
    //         databaseRef.off('value', fetchData);
    //       };
    //     }, []);
    //   };
    
    

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            console.log(currentUser)
            setUser(currentUser)
        })
        return ()=>{
            unsubscribe()
        }
    })

    return(
        <UserContext.Provider value={{createUser,user, logout,signIn,data}}>
            {children}
        </UserContext.Provider>
    )
    
    }
    export const UserAuth=()=>{
        return useContext(UserContext)
}

export const useFetchDataFromFirebase = () => {
    return useContext(UserContext).useFetchDataFromFirebase;
  };