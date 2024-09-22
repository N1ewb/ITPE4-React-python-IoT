import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const VideoStream: React.FC = () => {
  const videoRef = useRef<HTMLImageElement | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:5173");
    setSocket(newSocket);
    console.log("Socket", newSocket);
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("video_frame", (data) => {
        console.log("Received video frame:", data);
        if (videoRef.current) {
          videoRef.current.src = `data:image/jpeg;base64,${data.data}`;
        }
      });
    }
  });

  const handleStart = () => {
    console.log("Starting stream...");
    if (socket && socket.connected) {
      socket.emit("start_stream");
      videoRef;
    }
  };

  const handleStop = () => {
    if (socket) {
      socket.emit("stop_stream");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center p-20 gap-10">
      <h2 className="text-2xl text-indigo-800 font-bold">Face Scanner</h2>

      <div className="  rounded-3xl h-400px] w-[600px] text-center">
        {videoRef? <img className="rounded-3xl border-solid border-2 border-indigo-400" ref={videoRef} alt="Video Stream" /> : ""}
        {videoRef?  <p>Your face is being scanned!</p> : ""}
      </div>
      <div className="buttons flex flex-row gap-5 w-1/2 justify-center [&_button]:bg-indigo-600 [&_button]:rounded-md [&_button]:px-20 [&_button]:py-2 [&_button]:text-white">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

export default VideoStream;
