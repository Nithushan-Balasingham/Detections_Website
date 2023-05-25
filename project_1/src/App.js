import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AddNewUser from './Components/AddNewUser';
import Signin from './Components/SignIn/Signin';
import Details from './Components/Details/Details';
import { auth } from './firebase';
import Attend from './Components/attendance/Attend';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/details" element={<Details/>} />
      <Route path="/attendance" element={<Attend/>}/>
      <Route path="/addnewuser" element={<AddNewUser/>} />
    </Routes>
  );
}

export default App;
