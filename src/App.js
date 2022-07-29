import { Route, Routes, Link } from "react-router-dom";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Team from "./components/Teams";
import TeamDetails from "./components/TeamDetails";
import Players from "./components/Players";
import PlayerDetails from "./components/PlayerDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        {/* <Route path="/login" element={<LogIn />}></Route> */}
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/team" element={<Team />}></Route>
        <Route
          path="/team/team-details/:teamID/players"
          element={<Players />}
        ></Route>
        <Route
          path="/team/team-details/:teamID/"
          element={<TeamDetails />}
        ></Route>
        <Route
          path="/team/team-details/:teamID/players/player-details/:playerID"
          element={<PlayerDetails />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
