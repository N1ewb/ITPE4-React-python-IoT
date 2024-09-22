import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const VideoStream: React.FC = () => {
  const videoRef = useRef<HTMLImageElement | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
   
    const newSocket = io("http://127.0.0.1:5173");
    setSocket(newSocket);
    console.log("Socket", newSocket)
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    

    return () => {
      newSocket.disconnect();
    };
   
  },[]);

  useEffect(() => {
    if(socket){
      socket.on("video_frame", (data) => {
        console.log("Received video frame:", data); 
        if (videoRef.current) {
          videoRef.current.src = `data:image/jpeg;base64,${data.data}`;
        }
      });
    }
  })

  const handleStart = () => {
    console.log("Starting stream..."); 
    if (socket && socket.connected) {
      socket.emit("start_stream");
      videoRef
    }
  };

  const handleStop = () => {
    if (socket) {
      socket.emit("stop_stream");
    }
  };

  return (
    <div>
      <h2>Video Stream</h2>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <img ref={videoRef} alt="Video Stream" />
    </div>
  );
};

export default VideoStream;
