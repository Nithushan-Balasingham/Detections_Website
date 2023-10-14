import { useEffect } from 'react';
import database from '../../firebase';

export const useFetchDataFromFirebase = (setData) => {
  useEffect(() => {
    const databaseRef = database.ref('drowsiness');

    const fetchData = (snapshot) => {
      const fetchedData = snapshot.val();

      if (!fetchedData || Object.keys(fetchedData).length === 0) {
        setData(['No Data']);
      } else {
        const dataArray = Object.values(fetchedData);
        setData(dataArray);
      }
    };

    databaseRef.on('value', fetchData);

    return () => {
      databaseRef.off('value', fetchData);
    };
  }, [setData]);
};
