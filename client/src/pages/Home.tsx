import React, { useRef, useState } from "react";

const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startWebRTC() {
    try {
      const meteredLiveResponse = await fetch(
        "https://stc-for-spc.metered.live/api/v1/turn/credentials?apiKey=808823596105041da28407ec40f3c1eb4ffa"
      );

      if (!meteredLiveResponse.ok) {
        throw new Error(
          `Failed to fetch ICE servers: ${meteredLiveResponse.statusText}`
        );
      }

      const iceServers = await meteredLiveResponse.json();

      var newPc = new RTCPeerConnection({
        iceServers: iceServers,
      });

      newPc.onicecandidate = async (event) => {
        if (event.candidate) {
          try {
            const response = await fetch("/candidate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(event.candidate.toJSON()),
            });
            if (!response.ok) {
              throw new Error(
                `Failed to send ICE candidate: ${response.statusText}`
              );
            }
          } catch (error: Error | unknown) {
            if (error instanceof Error) {
              console.error("Error icecandidate WebRTC:", error);
              setError(`Icecandidate server error: ${error.message}`);
            } else {
              throw new Error(`Error unknown`);
            }
          }
        }
      };

      newPc.ontrack = (event) => {
        const [stream] = event.streams;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      };

      const offer = await newPc.createOffer();
      await newPc.setLocalDescription(offer);

      const response = await fetch("/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sdp: newPc.localDescription?.sdp,
          type: newPc.localDescription?.type,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      const remoteDesc = new RTCSessionDescription(data);
      await newPc.setRemoteDescription(remoteDesc);

      setPc(newPc);
      setError(null);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error("Error starting WebRTC:", error);
        setError(`WebRTC error: ${error.message}`);
      } else {
        throw new Error(`Error unknown`);
      }
    }
  }

  return (
    <div>
      <h1>WebRTC Video Stream</h1>
      <button onClick={startWebRTC}>Start Video</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", maxWidth: "640px" }}
        ></video>
      </div>
    </div>
  );
};

export default Home;
