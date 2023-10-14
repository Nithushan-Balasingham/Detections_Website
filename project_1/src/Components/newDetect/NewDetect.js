import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const NewDetect = () => {
  const [cameraOpen, setCameraOpen] = useState(false)
  const [prediction, setPrediction] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const isMounted = useRef(true);
  const navigate = useNavigate()
  const [showBack, setShowBack] = useState(false) // New Algorithm

  useEffect(() => {
    return () => {
      // Component will unmount, set isMounted to false
      isMounted.current = false;
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      isMounted.current = true; 
      requestAnimationFrame(captureFrame);
      setCameraOpen(true);
      setShowBack(true)
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const streamTracks = streamRef.current.getTracks();
      streamTracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      streamRef.current = null;
      setCameraOpen(false);
      setShowBack(false)
    }
  };

  const captureFrame = () => {
    if (!isMounted.current || !videoRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blobPromise = new Promise(resolve => {
      canvas.toBlob(resolve, 'image/jpeg');
    });

    blobPromise
      .then(blob => {
        const formData = new FormData();
        formData.append('file', blob);

        return fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPrediction(data);
      })
      .catch(error => {
        console.error('Error sending frame to API:', error);
      })
      .finally(() => {
        requestAnimationFrame(captureFrame);
      });
  };

  const handleBack = ()=>{
    navigate('/home')
  }

  return (
    <div className='flex h-screen items-center flex-col justify-center'>
      <h2 className='flex text-7xl text-cyan-400 font-bold mb-4'>Screen</h2>
      <div >
        <video ref={videoRef} autoPlay muted playsInline />
      </div>
      <div className='flex flex-col items-center justify-center mb-4'>
        <div className='text-4xl rounded-lg p-2 hover:text-green-600 font-bold text-green-400'>
          <button onClick={startCamera} disabled={cameraOpen} style={{cursor : cameraOpen ? "not-allowed" : "pointer"}}>
            Start Camera
          </button>
        </div>   
        <div className='text-4xl rounded-lg p-2 hover:text-red-600 font-bold text-red-400'>
          <button  onClick={stopCamera} disabled={!cameraOpen} style={{cursor : !cameraOpen ? "not-allowed" : "pointer"}}>
            Stop Camera
          </button>
        </div>   
       
      </div>
      {prediction && (
        <div className='flex flex-col text-left'>
          <p  className="font-bold text-blue-400 flex gap-4" style={{ fontSize: '20px' }}>
               Name:   
              <div className='font-bold text-rose-400'>          
                  {prediction.Name}
              </div>
          </p>
          <p className='font-bold text-purple-400  flex gap-6' style={{ fontSize: '20px' }}>
            Yawn:  
            <div className='font-bold text-rose-400'>          
              {prediction.Yawn ? "True" :"FALSE"}
            </div>
          </p>
          <p className='font-bold text-indigo-400 flex gap-1' style={{ fontSize: '20px' }}>
            Drowsy:  
            <div className='font-bold text-rose-400'>          
              {prediction.Drowsiness ? "True" :"FALSE"}
            </div>
          </p>
          
          <p style={{ fontSize: '20px' }}>{prediction.Yawn}</p>
        </div>
      )}
      <div className='flex items-center justify-center'>
            <button 
              className={`text-4xl rounded-lg p-2 hover:text-green-600 font-bold text-green-400  ${showBack ? 'hidden' : 'inline'}`}
              onClick={handleBack}  
            >Back</button>
          </div>
    </div>
  );
};

export default NewDetect