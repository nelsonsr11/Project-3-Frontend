import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Arrow from "@mui/icons-material/KeyboardBackspace";
import "./Players.css";

const Players = () => {
  const [players, setPlayers] = React.useState([]);
  const params = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    getPlayers();
  }, []);

  const options = {
    method: "GET",
    url: `https://api.statorium.com/api/v1/teams/${params.teamID}/?season_id=95&apikey=abcbe80c8c87a1c85fd3b32f383b0b45`,
  };
  console.log("params", params.teamID);

  const getPlayers = async () => {
    let response = await axios.request(options);
    console.log(response.data.team.players);
    setPlayers(response.data.team.players);
  };

  return (
    <div>
      {/* <nav>
        <Link to={`/team/team-details/:teamID`}>Team</Link>
        <Link to={`/team/team-details/${params.teamID}/players`}>Players</Link>
      </nav> */}
      <div className="arrow">
        <Arrow sx={{ fontSize: 40 }} onClick={() => navigate(-1)}>
          Players
        </Arrow>
        {/* <h3>Team</h3> */}
      </div>
      <h1>Team Players</h1>

      {players.map((brr) => {
        return (
          <Link
            to={`/team/team-details/:teamID/players/player-details/${brr.playerID}`}
          >
            <div>
              <h3>{brr.fullName}</h3>
              <img width={100} src={brr.photo}></img>
            </div>
          </Link>
        );
      })}
      {/* <button onClick={getWorldCup}>Go!</button> */}
      {/* <h1>Players</h1> */}
      {/* <button onClick={getPlayers}>Go!</button> */}
    </div>
  );
};

export default Players;
