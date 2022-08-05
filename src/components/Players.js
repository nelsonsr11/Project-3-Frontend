import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Arrow from "@mui/icons-material/KeyboardBackspace";
import "./Players.css";
// import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import logo from "./images/logo.png";

const Players = () => {
  const [players, setPlayers] = React.useState([]);
  const params = useParams();
  let european = [
    377, 378, 380, 381, 383, 384, 385, 386, 387, 389, 391, 394, 670,
  ];

  const navigate = useNavigate();
  const [playerPos, setPlayerPos] = React.useState({});

  React.useEffect(() => {
    getPlayers();
  }, []);

  const options = {
    method: "GET",

    url: `https://api.statorium.com/api/v1/teams/${params.teamID}/?season_id=95&apikey=${process.env.REACT_APP_API_KEY}`,
  };
  const options2 = {
    method: "GET",

    url: `https://api.statorium.com/api/v1/teams/${params.teamID}/?season_id=43&apikey=${process.env.REACT_APP_API_KEY}`,
  };

  const getPlayers = async () => {
    let response = await axios.request(options);
    console.log(response.data.team.players);
    console.log(response.data.team.players);
    // if (response.data.players.position === "1") {
    //   setPlayerPos("GoalKeeper");
    // } else if (response.data.player.additionalInfo.position === "2") {
    //   setPlayerPos("Defender");
    // } else if (response.data.player.additionalInfo.position === "3") {
    //   setPlayerPos("Midfielder");
    // } else if (response.data.player.additionalInfo.position === "4") {
    //   setPlayerPos("Forward");
    // }
    if (european.includes(Number(params.teamID))) {
      setPlayers(response.data.team.players);
    } else {
      let response = await axios.request(options2);
      setPlayers(response.data.team.players);
    }
  };

  const determinePosition = (player) => {
    if (player.additionalInfo.position === "1") {
      return "GoalKeeper";
    } else if (player.additionalInfo.position === "2") {
      return "Defender";
    } else if (player.additionalInfo.position === "3") {
      return "Midfielder";
    } else if (player.additionalInfo.position === "4") {
      return "Forward";
    }
  };

  return (
    <div className="all-players">
      {/* <nav>
        <Link to={`/team/team-details/:teamID`}>Team</Link>
        <Link to={`/team/team-details/${params.teamID}/players`}>Players</Link>
      </nav> */}
      <div className="arrow">
        <Arrow sx={{ fontSize: 40 }} onClick={() => navigate(-1)}>
          Players
        </Arrow>
        {/* <h3>Team</h3> */}
        <Link to="/">
          <img className="logo-lap" width="50px" src={logo}></img>
        </Link>
      </div>
      <h1>Team Players</h1>
      <div className="player-container">
        {players.map((brr) => {
          return (
            <Link
              className="link"
              to={`/team/team-details/:teamID/players/player-details/${brr.playerID}`}
            >
              <div className="player">
                {/* <hr></hr> */}
                <img width={50} src={brr.photo}></img>
                <div className="player-det">
                  <h3>{brr.fullName}</h3>
                  {/* <h3>{brr.playerNumber}</h3> */}
                  <h3 className="position">
                    Position: {determinePosition(brr)}
                  </h3>
                </div>

                {/* {brr.players.map((player) => {
                  <h3>Position: {player.length > 0 && player.playerNumber}</h3>;
                })} */}
              </div>
            </Link>
          );
        })}
      </div>
      {/* <button onClick={getWorldCup}>Go!</button> */}
      {/* <h1>Players</h1> */}
      {/* <button onClick={getPlayers}>Go!</button> */}
    </div>
  );
};

export default Players;
