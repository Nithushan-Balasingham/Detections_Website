import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddNewUser from './Components/AddNewUser';
import Signin from './Components/SignIn/Signin';
import Details from './Components/Details/Details';
import Attend from './Components/attendance/Attend';
import Home2 from './Components/Home/Home2';
import { AuthContextProvider } from './Context/AuthContext';
import ProtectedRoutes from './ProtectedRoutes';
import NewDetect from './Components/newDetect/NewDetect';
import Sananthan from './Components/Sananthan/Sananthan';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/details" element={<Details/>} />
      {/* <Route path="/test" element={<Sananthan/>} /> */}
      <Route path="/attendance" element={<ProtectedRoutes><Attend/></ProtectedRoutes>}/>
      <Route path="/addnewuser" element={<ProtectedRoutes><AddNewUser/></ProtectedRoutes>} />
      <Route path="/detect" element={<NewDetect/>} />
      <Route path="/home" element={<ProtectedRoutes><Home2/></ProtectedRoutes>} />
    </Routes>
    </AuthContextProvider>
  
  );
}

export default App;
