import React, { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import { Link } from 'react-router-dom';

function Drow() {
  const webcamRef = useRef(null);
  const [results, setResults] = useState('');

  useEffect(() => {
    const video_socket = io('http://127.0.0.1:5000/');

    const socketInterval = setInterval(() => {
      if (!webcamRef.current.getScreenshot()) return;
      video_socket.emit("video_feed", webcamRef.current.getScreenshot());
    }, 100);

    video_socket.on("video_out", (data) => {
      const results =data.data
      if(results !== null){
        setResults(JSON.stringify(results));
        console.log(results);

        setTimeout(()=>{
          setResults('');
        },3000)
      }
     
    });

    return () => {
      clearInterval(socketInterval);
      video_socket.disconnect();
    };
  }, [results]);

  return (
    <div className='flex items-center justify-center flex-col h-screen'>
      <div className='flex items-center justify-center flex-col  p-4 relative top-[-100px]'>
      <div className='m-7'>
        <h1 className='text-7xl font-bold font-mono text-green-400'>FEED</h1>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='shadow-xl h-[400px] rounded-lg bg-slate-500'>
        {true ? (
          <Webcam
            audio={false}
            videoConstraints={{
              width: 720,
              height: 360,
              facingMode: "user",
            }}
            mirrored={true}
            screenshotFormat={"image/jpeg"}
            ref={webcamRef}
          />
        ) : (
          <p>Loading video feed...</p>
        )}
      <div className='flex  items-center justify-center text-2xl font-semibold text-black'>
        <pre className='flex items-center justify-center'>{results}</pre>
      </div>

        </div>
        
      </div>
      <Link to='/home'className=' relative top-16 text-4xl rounded-lg p-2 hover:text-green-600 font-bold text-green-400'  >
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default Drow;