import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFetchDataFromFirebase } from './Fetchdata';

const Details = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useFetchDataFromFirebase(setData);

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className='h-screen w-full'>
      <div className='w-full  overflow-x-auto flex-col p-24   flex items-center justify-center '>
          <h2 className='text-5xl font-semibold text-teal-400 text-center mb-8'>History</h2>
          <table className='w-full table-auto text-sm text-center text-gray-500 dark:text-gray-400'>
            <thead className='text-2xl text-gray-700 uppercase dark:text-gray-400'>
              <tr>
                <th className='px-6 py-3 lg:w-1/5 xl:w-1/4 bg-gray-700 border-blue-500 border-b text-white'>
                  Attendee
                </th>
                <th className='px-6 py-3 lg:w-1/5 xl:w-1/4 bg-gray-300 border-blue-500 border-b text-black'>
                  Date
                </th>
                <th className='px-6 py-3 lg:w-1/5 xl:w-1/4 bg-gray-700 border-blue-500 border-b text-white'>
                  Time
                </th>
                <th className='px-6 py-3 lg:w-1/5 xl:w-1/4 bg-gray-300 border-blue-500 border-b text-black'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '20px' }}>
              {data && data.length !== 0 ? (
                data.map((item, i) => (
                  <tr key={i} className='border-b border-gray-200'>
                    <td className='px-6 py-4 whitespace-nowrap text-gray-300 font-bold'>
                      {item.name}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-gray-300 font-bold'>
                      {item.date}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-gray-300 font-bold'>
                      {item.time}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-gray-300 font-bold'>
                      {item.status}
                    </td>
                  </tr>
                ))
              ) : null}
            </tbody>
          </table>
        </div>
        <div className='flex items-center justify-center'>
          <button
            className='text-4xl rounded-lg p-2 hover:text-green-600 font-bold text-green-400'
            onClick={handleBack}
          >
            HOME
          </button>
        </div>
      </div>
  );
};

export default Details;
