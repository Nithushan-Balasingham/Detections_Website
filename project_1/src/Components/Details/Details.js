import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchDataFromFirebase } from './Fetchdata';

const Details = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]); // State to store the data fetched from Firebase

  useFetchDataFromFirebase(setData)

  const handleBack = () => {
    navigate('/home')
  }

  return (
    <div className='h-full flex items-center'>
      <div className='h-full w-full flex flex-col items-center justify-center'>
        <div className='flex h-24 items-center justify-center'>
          <h2 className='text-5xl font-semibold text-teal-400'>History</h2>
        </div>
        <div className="relative top-12">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-2xl text-gray-700 uppercase dark:text-gray-400 ">
              <tr>
                <th scope="col" className="px-6 py-3 w-96 bg-gray-300 border-blue-500 border-b">
                  Date
                </th>
                <th scope="col" className="px-6 py-3  w-96 bg-gray-700 border-blue-500 border-b">
                  Time
                </th>
                <th scope="col" className="px-6 py-3  w-96 bg-gray-300 border-blue-500 border-b" >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.length !== 0 ? (
                data.map((item, i) => (
                  <tr key={i} className='border-b border-gray-200'>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                      {item.date}
                    </th>
                    <td className="px-6 py-4">
                      {item.time}
                    </td>
                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                      {item.status}
                    </td>
                  </tr>
                ))
              ) : (
                null
              )}
            </tbody>
          </table>
          <div className='flex items-center justify-center'>
            <button className='text-4xl rounded-lg p-2 hover:text-green-600 font-bold text-green-400' onClick={handleBack}>HOME</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
