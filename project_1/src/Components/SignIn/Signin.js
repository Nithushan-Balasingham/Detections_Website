import React, { useState } from 'react'
import './Signin.css'
import { auth } from '../../firebase';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault();
            try {
              await signInWithEmailAndPassword(auth, email, password);
              setEmail('');
              setPassword('');
              setError('');
              
             if (email === 'Arthur@gmail.com') {
                alert('Got it');
                navigate('/details');
            } else {
                alert('Submitted');
                navigate('/attendance');
              }
            } catch (e) {
              setError(e.message);
              console.log(e.message);
            }
          };
  return (
            <div className='container_1'>
            <form onSubmit={handleSubmit} className='form_1'>
            <div className='Add_1'>Welcome</div>
            <Link to='/addnewuser' className='p'>Don't have account</Link>
            <div className='field_1'>
                <label>Email</label>
                <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='place'
                type='email'
                placeholder='email..'
                />
            </div>
            <div className='field_1'>
                <label>Password</label>
                <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='place'
                type='password'
                placeholder='password'
                />
            </div>
            {/* <div className='field_1'>
                <label>Confirm Password</label>
                <input className='place' type='password' placeholder='confirm_password' />
            </div> */}
            <button className='btn_1'>Let's Go</button>
            </form>
        </div>
    );
}      


export default Signin
// 12345678