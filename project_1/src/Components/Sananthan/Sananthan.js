// import React, { useEffect, useRef, useState } from 'react'

// const Sananthan = () => {
//     const [prediction, setPrediction] = useState(null);
//     const videoRef = useRef(null);
//     const streamRef = useRef(null);
  
//     useEffect(() => {
//       return () => {
//         stopCamera(); // Stop camera when component unmounts
//       };
//     }, []);
  
//     // Start capturing frames when the camera is started
//     const startCamera = async () => {
//       try {
//         const constraints = { video: true };
//         const stream = await navigator.mediaDevices.getUserMedia(constraints);
//         videoRef.current.srcObject = stream;
//         streamRef.current = stream;
  
//         // Start capturing frames recursively
//         requestAnimationFrame(captureFrame);
//       } catch (error) {
//         console.error('Error accessing camera:', error);
//       }
//     };
  
//     const stopCamera = () => {
//       if (streamRef.current) {
//         const streamTracks = streamRef.current.getTracks();
//         streamTracks.forEach(track => track.stop());
//         videoRef.current.srcObject = null;
//         streamRef.current = null;
//       }
//     };
  
//     const captureFrame = () => {
//       const video = videoRef.current;
//       const canvas = document.createElement('canvas');
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       const context = canvas.getContext('2d');
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
//       const blobPromise = new Promise(resolve => {
//         canvas.toBlob(resolve, 'image/jpeg');
//       });
  
//       blobPromise
//         .then(blob => {
//           const formData = new FormData();
//           formData.append('file', blob);
  
//           return fetch('http://localhost:5000/upload', {
//             method: 'POST',
//             body: formData,
//           });
//         })
//         .then(res => res.json())
//         .then(data => {
//           console.log(data);
//           setPrediction(data);
//         })
//         .catch(error => {
//           console.error('Error sending frame to API:', error);
//         })
//         .finally(() => {
//           // Capture the next frame recursively
//           requestAnimationFrame(captureFrame);
//         });
//     };
  
//     return (
//       <div className='App'>
//         <div className='video-container'>
//           <video ref={videoRef} autoPlay muted playsInline />
//         </div>
//         <div className='button-container'>
//           <button className='start-button' onClick={startCamera}>
//             Start Camera
//           </button>
//           <button className='stop-button' onClick={stopCamera}>
//             Stop Camera
//           </button>
//         </div>
//         {prediction && (
//           <div className='prediction-container'>
//             <h2>Sign:</h2>
//             <p style={{ fontSize: '20px' }}>{prediction.message.charAt(0).toUpperCase() + prediction.message.slice(1)}</p>
//           </div>
//         )}
//       </div>
//     );
//   };

// export default Sananthan