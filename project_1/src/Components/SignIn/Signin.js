import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../Context/AuthContext';

function Signin() {
    const {signIn} = UserAuth( )
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault();
            try {
              await signIn(email, password)
              setError('');
              navigate('/home')
            } catch (e) {
              setError(e.message);
              console.log(e.message);
            }
          };
  return (
            <div className='h-screen w-full flex justify-center items-center tracking-wide'>
          <div className=' text-[#1f2937] p-8 shadow-xl shadow-black rounded-lg  h-[400px]'>
            <div>
            <div className='flex flex-col items-center justify-center'>
            <div className='text-5xl mb-6 flex items-center justify-center flex-col text-teal-400'>Welcome</div>
            <form onSubmit={handleSubmit} className='flex flex-col w-full mt-4 '>
            
            <div className='flex flex-col m-3'>
                <label className='font-bold w-fit text-2xl text-green-400'>Email</label>
                <input
                onChange={(e) => setEmail(e.target.value)}
                className='w-250 px-4 py-2 border rounded-lg text-teal-400'
                value={email}
                type='email'
                placeholder='email..'
                />
            </div>
            <div className='flex flex-col m-3'>
                <label className='font-bold w-fit text-2xl text-green-400'>Password</label>
                <input
                onChange={(e) => setPassword(e.target.value)}
                className='w-250 px-4 py-2 border rounded-lg text-teal-400'
                value={password}
                type='password'
                placeholder='password'
                />
            </div>
            {/* <div className='field_1'>
                <label>Confirm Password</label>
                <input className='place' type='password' placeholder='confirm_password' />
            </div> */}
            <div className='flex items-center justify-center'> 
                <button 
                className=' rounded-lg text-2xl font-bold bg-green-400 hover:bg-rose-400 w-48 text-center p-1 mt-4' 

            >Let's Go
            </button></div>
           
            {error && <span className='text-red-400 flex items-center justify-center mt-4 font-bold' >Wrong Email or Password</span>}
            </form>
            </div>
        </div>
        </div>
        </div>
    );
}      


export default Signin
// 12345678