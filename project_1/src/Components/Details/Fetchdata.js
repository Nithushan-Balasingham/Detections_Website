import { useEffect } from 'react';
import database from '../../firebase';

export const useFetchDataFromFirebase = (setData) => {
    useEffect(() => {
      // Get a reference to the 'drowsiness' collection in Firebase Realtime Database
      const databaseRef = database.ref('drowsiness');
  
      // Attach a listener to the 'value' event to fetch the data
      const fetchData = (snapshot) => {
        const fetchedData = snapshot.val();
  
        // Convert the fetched data into an array and update the state
        const dataArray = Object.values(fetchedData);
        setData(dataArray);
      };
  
      databaseRef.on('value', fetchData);
  
      // Clean up the listener when the component unmounts
      return () => {
        databaseRef.off('value', fetchData);
      };
    }, [setData]);
  };