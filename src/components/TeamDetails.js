import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Arrow from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import "./TeamDetails.css";
import Button from "@mui/material/Button";

const TeamDetails = () => {
  const [team, setTeam] = React.useState({});
  const [matches, setMatches] = React.useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const options = {
    method: "GET",
    url: `https://api.statorium.com/api/v1/teams/${params.teamID}/?season_id=95&apikey=abcbe80c8c87a1c85fd3b32f383b0b45`,
  };
  // console.log("params", params.teamID);

  const getTeam = async () => {
    let response = await axios.request(options);
    setTeam(response.data.team);
  };

  React.useEffect(() => {
    getTeam();
  }, []);

  const options2 = {
    method: "GET",
    url: `https://api.statorium.com/api/v1/matches/?season_id=121&apikey=abcbe80c8c87a1c85fd3b32f383b0b45`,
  };
  const getMatches = async (e) => {
    e.preventDefault();
    let response = await axios.request(options2);

    let allMatchesDay1 = response.data.calendar.matchdays[0].matches;
    // console.log(allMatches[0].awayParticipant.participantID);

    let filteredMatches = allMatchesDay1.filter(function (country) {
      return (
        country.awayParticipant.participantID === params.teamID ||
        country.homeParticipant.participantID === params.teamID
      );
    });
    console.log(filteredMatches);

    let allMatchesDay2 = response.data.calendar.matchdays[1].matches;
    // console.log(allMatches[2].awayParticipant.participantID);

    let filteredMatches2 = allMatchesDay2.filter(function (country) {
      return (
        country.awayParticipant.participantID === params.teamID ||
        country.homeParticipant.participantID === params.teamID
      );
    });
    console.log(filteredMatches2);

    let allMatchesDay3 = response.data.calendar.matchdays[2].matches;
    // console.log(allMatches[2].awayParticipant.participantID);

    let filteredMatches3 = allMatchesDay3.filter(function (country) {
      return (
        country.awayParticipant.participantID === params.teamID ||
        country.homeParticipant.participantID === params.teamID
      );
    });
    console.log(filteredMatches3);

    setMatches(filteredMatches);

    // const filteredTeam =
    //   matches.length > 0 &&
    //   matches.filter(function (country) {
    //     return country.awayParticipant.participantID;
    //     // country.homeParticipant.participantID
    //   });

    // console.log(response.data.calendar.matchdays[0].matches);
    // setMatches(response.data.calendar.matchdays[0].matches);
  };

  // React.useEffect(() => {
  //   getMatches();
  // }, []);

  console.log(matches);

  return (
    <div>
      <div className="arrow-team">
        <Arrow sx={{ fontSize: 40 }} onClick={() => navigate(-1)}></Arrow>
        {/* <h3>Teams</h3> */}
      </div>
      <div className="team-details">
        <div>
          <img height="180 " src={team.logo}></img>
        </div>
        <div>
          <h2>Teams Details</h2>
          <h4>Team Name: {team.teamName}</h4>
          <h4>Short Name: {team.shortName}</h4>
          <Link
            className="players-link "
            to={`/team/team-details/${params.teamID}/players`}
          >
            <Button variant="outlined">View roster</Button>
          </Link>
        </div>

        <button onClick={getMatches}>Go!</button>
      </div>
      <p>{matches.length > 0 && matches[0].matchID}</p>
    </div>
  );
};

export default TeamDetails;
