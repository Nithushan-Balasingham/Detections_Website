import React, { useEffect, useRef, useState } from 'react'
import Typewriter from 'typewriter-effect';

const NewDetect = () => {
  const [prediction, setPrediction] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const isMounted = useRef(true);
  const [stopCam, setStopCam] = useState(false)

  const yawnAlert = window.speechSynthesis;
  const drowsinessAlert = window.speechSynthesis

  const speakAlert = () => {
    const utterance = new SpeechSynthesisUtterance('Yawn detected');
    yawnAlert.speak(utterance);
  };

  const speakAlertTwo = ()=>{
    const utteranceTwo = new SpeechSynthesisUtterance('Drowsiness detected! Please stay alert.');
    drowsinessAlert.speak(utteranceTwo)
  }
  useEffect(() => {
    const startCameraAutomatically = async () => {
      try {
        console.log("lOg",streamRef)
          const constraints = { video: true };
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          requestAnimationFrame(captureFrame);
          isMounted.current = !stopCam;
       
        if (stopCam){
          setTimeout(() => {
            setStopCam(false);
          }, 10000);
        }       
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCameraAutomatically();

    return () => {
      isMounted.current = false;
    };
  }, [stopCam]);

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
        if (data.Yawn) {
          speakAlert();
        }
        if (data.Drowsiness) {
+          speakAlertTwo();
        }
        setPrediction(data);
        setStopCam(data.Drowsiness)
      
      })
      .catch(error => {
        console.error('Error sending frame to API:', error);
      })
      .finally(() => {
        requestAnimationFrame(captureFrame);
      });
  };

  return (
    <div className='flex h-screen items-center flex-col p-4'>
      <div className='  w-[70vh] h-[60vh]' >
        <video ref={videoRef} autoPlay muted playsInline />
      </div>
      <div className='flex flex-col items-center justify-center mb-4'>
       
      </div>
      <div className="text-4xl mb-1 text-cyan-400 font-light">
          Predictions
        </div>
      {prediction && (
        <div className='flex flex-col shadow-xl p-4 items-center justify-center h-48 w-80 rounded-xl shadow-black'>
          <p  className="font-bold text-blue-400 flex gap-4 " style={{ fontSize: '25px' }}>
               Name:   
              <div className='font-bold text-rose-400'>          
                  {prediction.Name}
              </div>
          </p>
          <p className='font-bold text-purple-400  flex gap-6 ' style={{ fontSize: '25px' }}>
            Yawn:  
            <div className='font-bold text-rose-400'>          
              {prediction.Yawn ? "Detected" :"None"}
            </div>
          </p>
          <p className='font-bold text-indigo-400 flex gap-1' style={{ fontSize: '25px' }}>
            Drowsy:  
            <div className='font-bold text-rose-400'>          
              {prediction.Drowsiness ? "Detected" :"None"}
            </div>
          </p>
          
          <p style={{ fontSize: '20px' }}>{prediction.Yawn}</p>
        </div>
      )}
      {/* <div className='flex items-center justify-center'>
            <button 
              className={`text-4xl rounded-lg p-2 hover:text-green-600 font-bold text-green-400 `}
              onClick={handleBack}  
            >Back</button>
          </div> */}
    </div>
  );
};

export default NewDetect