import React, { useEffect, useState } from 'react'
import {signOut,onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../Context/AuthContext';
import Typewriter from 'typewriter-effect';



function Home() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const{logout} = UserAuth()
   
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log(currentUser)
            setUser(currentUser)
        })
        return ()=>{
            unsubscribe(     )
        }
    },[])
    const handleLogout = async()=>{
        try{
            await logout()
            navigate('/')
            console.log("logged out")
        }catch(e){
          console.log(e.message)
        }
      }
      const handleSystem=()=>{
        navigate('/detect')
        // navigate("/attendance")
      }

      const handleDetails=()=>{
        navigate('/details')
      }
    
    
    return(
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-500  via-gray-600 to-gray-800  bg-gray-200'>
      <div className= 'flex items-center justify-center flex-col'>
      <div className='flex items-center justify-center text-4xl  font-bold font-serif m-5'>
      <h1 className='text-4xl font-mono font-semibold bg-gradient-to-r text-transparent from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text'>     
        <Typewriter
                options={{
                strings:['Welcome to  system Admin'],
                autoStart:true,
                loop:true,
              }}
              />
            </h1>
      </div>
        <div className='shadow-xl shadow-black rounded-lg p-12'>
          <div className='flex items-center justify-center text-5xl text-teal-500 font-bold font-serif m-5'>
            <h1 >Account</h1>
           
          </div>
          <div className=' flex flex-col items-center justify-center m-4'>
            <p className='text-4xl text-teal-400' >Email</p>
            <p className='text-3xl text-purple-300'>{user && user.email}</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div  >
            <button className='text-rose-400 text-3xl font-serif font-bold' onClick={handleLogout} >LogOut</button>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center mt-7'>
          <div>
            <button className='text-4xl rounded-lg p-2 hover:text-green-600 font-bold text-green-400' onClick={handleDetails}>Details</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
