import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TeamDetails from "./TeamDetails";
import Table from "@mui/material/Table";

const Team = () => {
  const [teams, setTeams] = React.useState([]);
  //   const navigate = useNavigate();

  const options = {
    method: "GET",
    url: "https://api.statorium.com/api/v1/standings/121/?apikey=abcbe80c8c87a1c85fd3b32f383b0b45",
  };

  const getWorldCup = async () => {
    let response = await axios.request(options);
    console.log(response.data);
    setTeams(response.data.season.groups);
  };
  console.log(teams);

  React.useEffect(() => {
    getWorldCup();
  }, []);

  return (
    <div>
      <h1>This is team</h1>

      {/* <button onClick={getWorldCup}>Click</button> */}
      {teams.map((brr) => {
        return (
          <div>
            <h1>{brr.groupName}</h1>
            {brr.standings.map((standing) => {
              return (
                <div>
                  <Link to={`/team/team-details/${standing.teamID}`}>
                    <h3>{standing.teamName}</h3>
                    <img width="80" src={standing.logo} alt="logo"></img>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Team;

// const [options, setOptions] = React.useState({});
