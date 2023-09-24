import { useEffect } from 'react';
import database from '../../firebase';

export const useFetchDataFromFirebase = (setData) => {
  useEffect(() => {
    const databaseRef = database.ref('drowsiness');

    const fetchData = (snapshot) => {
      const fetchedData = snapshot.val();

      // Check if fetchedData is falsy or an empty object
      if (!fetchedData || Object.keys(fetchedData).length === 0) {
        setData(['No Data']); // Set data to an array with "No Data" message
      } else {
        const dataArray = Object.values(fetchedData);
        setData(dataArray);
      }
    };

    databaseRef.on('value', fetchData);

    // Clean up the listener when the component unmounts
    return () => {
      databaseRef.off('value', fetchData);
    };
  }, [setData]);
};
