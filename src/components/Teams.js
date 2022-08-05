import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TeamDetails from "./TeamDetails";
import Table from "@mui/material/Table";
import "./Teams.css";
import logo from "./images/logo.png";
import { useNavigate } from "react-router-dom";
import Arrow from "@mui/icons-material/KeyboardBackspace";

const Team = () => {
  const [teams, setTeams] = React.useState([]);
  const navigate = useNavigate();

  const options = {
    method: "GET",
    url: `https://api.statorium.com/api/v1/standings/121/?apikey=${process.env.REACT_APP_API_KEY}`,
  };

  const getWorldCup = async () => {
    let response = await axios.request(options);
    console.log(response.data);
    setTeams(response.data.season.groups);
  };

  React.useEffect(() => {
    getWorldCup();
  }, []);

  return (
    <div className="teams1">
      {/* <h1>This is team</h1> */}
      <div className="arrow">
        <Arrow sx={{ fontSize: 40 }} onClick={() => navigate(-1)}>
          Players
        </Arrow>
        {/* <h3>Team</h3> */}
        <Link to="/">
          <img width="50px" src={logo} className="logo-lap"></img>
        </Link>
      </div>

      {/* <button onClick={getWorldCup}>Click</button> */}
      {teams.map((brr) => {
        return (
          <div className="teams">
            <h1>{brr.groupName}</h1>
            <div className="table1">
              <table>
                <thead>
                  <tr className="tr">
                    <th>Rank</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Lost</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {brr.standings.map((standing) => {
                    return (
                      <tr>
                        <td>1</td>
                        <Link
                          className="link-teams"
                          to={`/team/team-details/${standing.teamID}`}
                        >
                          {/* <h5>{standing.teamName}</h5> */}
                          <div className="team-flag">
                            <td>
                              <img
                                width="50"
                                src={standing.logo}
                                alt="logo"
                                title={standing.teamName}
                              ></img>
                              <div className="team-name">
                                {/* <h5>{standing.teamName}</h5> */}
                              </div>
                            </td>
                          </div>
                        </Link>

                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Team;

// const [options, setOptions] = React.useState({});
