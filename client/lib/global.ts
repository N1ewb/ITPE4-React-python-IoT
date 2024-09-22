import { useState } from "react";

export default async function handleGetStunServer() {
  const [iceServers, setIceServers] = useState();
  const meteredLiveResponse = await fetch(
    "https://stc-for-spc.metered.live/api/v1/turn/credentials?apiKey=808823596105041da28407ec40f3c1eb4ffa"
  );

  if (!meteredLiveResponse.ok) {
    throw new Error(
      `Failed to fetch ICE servers: ${meteredLiveResponse.statusText}`
    );
  }

  setIceServers(await meteredLiveResponse.json());
  if (iceServers) {
    return iceServers;
  }
}
