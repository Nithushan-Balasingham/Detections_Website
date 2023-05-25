import React, { useEffect, useState } from 'react';
import { useFetchDataFromFirebase } from './Fetchdata';
import './Details.css'
import { Link, useNavigate } from 'react-router-dom';

const Details = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate()
    useFetchDataFromFirebase(setData);

  const handleback = ()=>{
    navigate('/')
  }
 

  return (
  <div>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {data.map((item,i) => (
        <tr key={i}>
            <td>{item.date}</td>
            <td>{item.time}</td>
            <td>{item.status}</td>
        </tr>
        ))}
      </tbody>
  </table>
  <Link to='/' ><button  className='hs'>Back</button></Link> 
</div>
 

);
};

export default Details;
