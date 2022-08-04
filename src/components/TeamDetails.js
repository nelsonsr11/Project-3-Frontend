import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Arrow from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import "./TeamDetails.css";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import logo from "./images/logo.png";
import { post } from "../services/service";
import { Numbers } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { red } from "@mui/material/colors";
import { deleted } from "../services/service";

const TeamDetails = () => {
  const [team, setTeam] = React.useState([]);

  const [matches1, setMatches1] = React.useState([]);
  const [matches2, setMatches2] = React.useState([]);
  const [matches3, setMatches3] = React.useState([]);
  const params = useParams();
  const navigate = useNavigate();
  let european = [
    377, 378, 380, 381, 383, 384, 385, 386, 387, 389, 391, 394, 670,
  ];
  const [check, setCheck] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const options = {
    method: "GET",
    url: `https://api.statorium.com/api/v1/teams/${params.teamID}/?season_id=95&apikey=${process.env.REACT_APP_API_KEY}`,
  };

  const options3 = {
    method: "GET",
    url: `https://api.statorium.com/api/v1/teams/${params.teamID}/?season_id=43&apikey=${process.env.REACT_APP_API_KEY}`,
  };

  const getTeam = async () => {
    console.log(params.teamID);
    console.log(385);
    console.log(european);
    let isEuropean = european.includes(Number(params.teamID));
    if (isEuropean) {
      console.log("european team found");
      let response = await axios.request(options);
      console.log(response.data.team.teamID);
      setTeam(response.data.team);
    } else {
      let response = await axios.request(options3);
      setTeam(response.data.team);
      console.log(response.data.team);
    }
  };

  // console.log(european.length);

  React.useEffect(() => {
    getTeam();
  }, []);

  const options2 = {
    method: "GET",
    url: `https://api.statorium.com/api/v1/matches/?season_id=121&apikey=${process.env.REACT_APP_API_KEY}`,
  };

  React.useEffect(() => {
    getMatches();
  }, []);

  const getMatches = async () => {
    // e.preventDefault();
    let response = await axios.request(options2);

    let allMatchesDay1 = response.data.calendar.matchdays[0].matches;
    // console.log(allMatches[0].awayParticipant.participantID);

    let filteredMatches = allMatchesDay1.filter(function (country) {
      return (
        country.awayParticipant.participantID === params.teamID ||
        country.homeParticipant.participantID === params.teamID
      );
    });
    // console.log(filteredMatches);
    setMatches1(filteredMatches);

    let allMatchesDay2 = response.data.calendar.matchdays[1].matches;
    let filteredMatches2 = allMatchesDay2.filter(function (country) {
      return (
        country.awayParticipant.participantID === params.teamID ||
        country.homeParticipant.participantID === params.teamID
      );
    });
    // console.log(filteredMatches2);
    setMatches2(filteredMatches2);

    let allMatchesDay3 = response.data.calendar.matchdays[2].matches;
    let filteredMatches3 = allMatchesDay3.filter(function (country) {
      return (
        country.awayParticipant.participantID === params.teamID ||
        country.homeParticipant.participantID === params.teamID
      );
    });
    // console.log(filteredMatches3);

    setMatches3(filteredMatches3);
  };

  const favoriteTeams = async (favorite) => {
    console.log(favorite);
    let response = await post("/teams", {
      fullName: favorite.teamName,
      teamImg: favorite.logo,
      teamId: favorite.teamID,
    });
    // console.log(response.data);
    setCheck(!check);
  };

  return (
    <div className="team">
      <div className="arrow-team">
        <Arrow sx={{ fontSize: 40 }} onClick={() => navigate(-1)}></Arrow>
        {/* <h3>Teams</h3> */}
        <img width="50px" src={logo}></img>
      </div>
      <div className="team-details">
        <div>
          <img height="180 " src={team.logo}></img>
        </div>
        <div className="team-details1">
          <h1>Teams Details</h1>
          <h4>Team Name: {team.teamName}</h4>
          <h4>Short Name: {team.shortName}</h4>
          <div className="buttons">
            <Link
              className="players-link "
              to={`/team/team-details/${params.teamID}/players`}
            >
              <Button variant="outlined">View roster</Button>
            </Link>
            {check === false && (
              <FavoriteBorderIcon
                className="love-button"
                onClick={() => favoriteTeams(team)}
                sx={{ color: red[900] }}
              ></FavoriteBorderIcon>
            )}
          </div>
          {/* <butoton onClick={removeTeam}>Remove</butoton> */}
        </div>
      </div>
      <div className="game-table">
        <h2>Upcoming Matches</h2>
        <div className="first-game">
          <div className="first-team">
            <img
              width="60"
              src={matches1.length > 0 && matches1[0].awayParticipant.logo}
            ></img>
            <h4 className="text-wrap">
              {matches1.length > 0 &&
                matches1[0].awayParticipant.participantName}
            </h4>
          </div>
          <div className="time-date">
            <p>Date: {matches1.length > 0 && matches1[0].matchDate}</p>
            <p className="hour">
              Hour: {matches1.length > 0 && matches1[0].matchTime}
            </p>
          </div>
          <div className="second-team">
            <img
              width="60"
              src={matches1.length > 0 && matches1[0].homeParticipant.logo}
            ></img>
            <h4 className="text-wrap">
              {matches1.length > 0 &&
                matches1[0].homeParticipant.participantName}
            </h4>
          </div>
        </div>

        {/* <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        /> */}

        <hr></hr>
        <div className="second-game">
          <div className="first-team">
            <img
              width="60"
              src={matches1.length > 0 && matches2[0].awayParticipant.logo}
            ></img>
            {/* className="text-wrap" */}
            <h4 className="text-wrap">
              {matches1.length > 0 &&
                matches2[0].awayParticipant.participantName}
            </h4>
            {/* </div> */}
          </div>
          <div className="time-date">
            <p>Date: {matches1.length > 0 && matches2[0].matchDate}</p>
            <p className="hour">
              Hour: {matches1.length > 0 && matches2[0].matchTime}
            </p>
          </div>
          <div className="second-team">
            <img
              width="60"
              src={matches1.length > 0 && matches2[0].homeParticipant.logo}
            ></img>
            <h4>
              {matches1.length > 0 &&
                matches2[0].homeParticipant.participantName}
            </h4>
          </div>
        </div>
        <hr></hr>
        <div className="third-game">
          <div className="first-team">
            <img
              width="60"
              src={matches1.length > 0 && matches3[0].awayParticipant.logo}
            ></img>
            <h4>
              {matches1.length > 0 &&
                matches3[0].awayParticipant.participantName}
            </h4>
          </div>
          <div className="time-date">
            <p>Date: {matches1.length > 0 && matches3[0].matchDate}</p>
            <p className="hour">
              Hour: {matches1.length > 0 && matches3[0].matchTime}
            </p>
          </div>
          <div className="second-team">
            <img
              width="60"
              src={matches1.length > 0 && matches3[0].homeParticipant.logo}
            ></img>
            <h4>
              {matches1.length > 0 &&
                matches3[0].homeParticipant.participantName}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
