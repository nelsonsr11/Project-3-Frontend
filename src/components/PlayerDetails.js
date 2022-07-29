import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

const PlayerDetails = () => {
  const [playerDetails, setPlayerDetails] = React.useState({});
  const params = useParams();

  const options = {
    method: "GET",
    url: `https://api.statorium.com/api/v1/players/${params.playerID}/?season_id=95&apikey=abcbe80c8c87a1c85fd3b32f383b0b45`,
  };

  console.log(params.playerID);

  const getPlayerDetails = async () => {
    let response = await axios.request(options);
    console.log(response.data);
    setPlayerDetails(response.data.player);
  };

  React.useEffect(() => {
    getPlayerDetails();
  }, []);

  return (
    <div>
      <h1>PLAYER DET</h1>
      <img src={playerDetails.photo}></img>
      <h3>{playerDetails.fullName}</h3>
      {/* <button onClick={getPlayerDetails}>LOL</button> */}
    </div>
  );
};

export default PlayerDetails;
