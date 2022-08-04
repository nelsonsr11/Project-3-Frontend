import React from "react";
import { get } from "../services/service";
import { deleted } from "../services/service";
import "./FavoriteTeams.css";
import Arrow from "@mui/icons-material/KeyboardBackspace";
import logo from "./images/logo.png";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";

const FavoriteTeams = () => {
  const [favTeams, setFavTeams] = React.useState([]);
  const navigate = useNavigate();

  const getFavoriteTeams = async () => {
    let response = await get("/teams/details");
    console.log(response.data);
    setFavTeams(response.data);
  };

  React.useEffect(() => {
    getFavoriteTeams();
  }, []);

  const removeTeam = async (team) => {
    console.log(team.teamId);
    try {
      let response = await deleted(`/teams/delete/${team}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="favorites">
      <div className="arrow">
        <Arrow
          sx={{ fontSize: 40, color: grey[900] }}
          onClick={() => navigate(-1)}
        >
          Players
        </Arrow>
        <img width="50px" src={logo}></img>
      </div>
      <h1>Favorite Teams</h1>
      <hr></hr>
      {/* <button onClick={getFavoriteTeams}>GET TEAMS</button> */}

      {favTeams.map((brr) => {
        return (
          <div className="favteam">
            <Link
              // className="link-teams2"
              to={`/team/team-details/${brr.teamId}`}
            >
              <img width="100" src={brr.teamImg}></img>
            </Link>
            <h2>{brr.fullName}</h2>
            {/* <button onClick={() => removeTeam(favTeams[0])}>Remove TEAM</button> */}
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteTeams;
