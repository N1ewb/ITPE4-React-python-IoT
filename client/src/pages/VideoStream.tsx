import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const VideoStream: React.FC = () => {
  const videoRef = useRef<HTMLImageElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    console.log("Initializing socket connection...");
    const socketUrl =
      window.location.hostname === "localhost"
        ? "http://127.0.0.1:5000"
        : "https://itpe4-react-python-iot.onrender.com";

    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
      setSocket(newSocket);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    newSocket.on("connect_error", (error: Error) => {
      console.error("Connection error:", error);
    });

    newSocket.on("test_event", (data) => {
      console.log("Received test event:", data);
    });

    return () => {
      console.log("Cleaning up socket connection...");
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && isStreaming) {
      console.log("Setting up video_data listener");
      socket.on("video_data", (data: { data: string }) => {
        if (videoRef.current) {
          videoRef.current.src = `data:image/jpeg;base64,${data.data}`;
        }
      });

      return () => {
        socket.off("video_data");
      };
    }
  }, [socket, isStreaming]);

  const handleStart = () => {
    if (socket && socket.connected) {
      console.log("Starting stream...");
      socket.emit("start_stream");
      setIsStreaming(true);
    } else {
      console.log("Socket not connected, can't start stream");
    }
  };

  const handleStop = () => {
    if (socket) {
      console.log("Stopping stream...");
      socket.emit("stop_stream");
      setIsStreaming(false);
    } else {
      console.log("Socket not available, can't stop stream");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center p-20 gap-10">
      <h2 className="text-2xl text-indigo-800 font-bold">Face Scanner</h2>

      <div className="rounded-3xl h-[400px] w-[600px] text-center">
        <img
          className="rounded-3xl border-solid border-2 border-indigo-400"
          ref={videoRef}
          alt="Video Stream"
        />
        <p>
          {isStreaming ? "Your face is being scanned!" : "Stream is stopped"}
        </p>
      </div>
      <div className="buttons flex flex-row gap-5 w-1/2 justify-center [&_button]:bg-indigo-600 [&_button]:rounded-md [&_button]:px-20 [&_button]:py-2 [&_button]:text-white">
        <button onClick={handleStart} disabled={isStreaming}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isStreaming}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default VideoStream;
