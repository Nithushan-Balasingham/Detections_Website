import React, { useState } from 'react';
import './AddNewUser.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function AddNewUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setError('');
      alert('Submitted');
      navigate('/')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className='container_1'>
      <form onSubmit={handleSubmit} className='form_1'>
        <div className='Add_1'>Add New User</div>
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
        <button className='btn_1'>Create</button>
      </form>
    </div>
  );
}

export default AddNewUser;
