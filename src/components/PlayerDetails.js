import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import "./PlayerDetails.css";
import Arrow from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const PlayerDetails = () => {
  const [playerDetails, setPlayerDetails] = React.useState({});
  const [playerInfo, setPlayerInfo] = React.useState({});
  const [playerPos, setPlayerPos] = React.useState({});
  const params = useParams();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const options = {
    method: "GET",
    url: `https://api.statorium.com/api/v1/players/${params.playerID}/?season_id=95&apikey=${process.env.REACT_APP_API_KEY}`,
  };

  const options2 = {
    method: "GET",
    url: `https://api.statorium.com/api/v1/players/${params.playerID}/?season_id=43&apikey=${process.env.REACT_APP_API_KEY}`,
  };

  // console.log(params.playerID);

  const getPlayerDetails = async () => {
    let response = await axios.request(options);
    console.log(response.data);
    if (response.data.player.additionalInfo.position === "1") {
      setPlayerPos("GoalKeeper");
    } else if (response.data.player.additionalInfo.position === "2") {
      setPlayerPos("Defender");
    } else if (response.data.player.additionalInfo.position === "3") {
      setPlayerPos("Midfielder");
    } else if (response.data.player.additionalInfo.position === "4") {
      setPlayerPos("Forward");
    }
    setPlayerDetails(response.data.player);
    setPlayerInfo(response.data.player.additionalInfo);
    //     setPlayerPos(response.data.player.additionalInfo.position);
  };

  React.useEffect(() => {
    getPlayerDetails();
  }, []);

  return (
    <div className="player-details">
      <div className="arrow">
        <Arrow sx={{ fontSize: 40 }} onClick={() => navigate(-1)}>
          Players
        </Arrow>
        <Link to="/">
          <img width="50px" className="logo-lap" src={logo}></img>
        </Link>
      </div>
      {/* <h1>PLAYER DET</h1> */}
      <div className="picture">
        <img src={playerDetails.photo}></img>
      </div>
      <div className="player-info">
        <h4>First Name: {playerDetails.firstName}</h4>
        <h4>Last Name: {playerDetails.lastName}</h4>
        <h4>Short Name: {playerDetails.shortName}</h4>
        {/* 
        {playerDetails.map((brr) => {
          return (
            <div>
              <p>{brr.playerNumber}</p>
            </div>
          );
        })} */}

        {/* <h4>Player Number: {playerDetails.teams[0].playerNumber}</h4> */}
        <h4>Birth Date: {playerInfo.birthdate}</h4>
        <h4>Weight: {playerInfo.weight}</h4>
        <h4>Height: {playerInfo.height}</h4>
        <h4>Position: {playerPos.length > 0 && playerPos}</h4>
      </div>
      <div className="rating">
        <Box
          sx={{
            "& > legend": { mt: 1 },
          }}
        >
          <Typography component="legend"></Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </div>
    </div>
  );
};

export default PlayerDetails;
