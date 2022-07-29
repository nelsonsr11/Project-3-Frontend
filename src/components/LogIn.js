import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { post } from "../services/service";
import TextField from "@mui/material/TextField";
import logo from "../components/images/logo.png";
import "./Login.css";
// import * as React from "react";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const LogIn = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("");

  const navigate = useNavigate();

  const navigateCreate = () => {
    navigate("/team");
  };

  const check = async (e) => {
    e.preventDefault();
    if (!username || !password || password.length < 6) {
      setStatus("Please enter a valid username and password");
      console.log("Password too short");
    } else {
      try {
        let response = await post("/user/login", {
          username: username,
          password: password,
        });
        console.log(response);
        localStorage.setItem("token", response.data);
        navigateCreate();
      } catch (err) {
        console.error(err.message);
        setStatus("Password or username is incorrect");
      }
    }
  };

  return (
    <div className="login-main">
      {/* <h1>Welcome!</h1> */}
      {/* <form onSubmit={check}> */}
      {/* <label>Username</label>
      <input
        type="text"
        placeholder="Username"
        // onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /> */}

      {/* </form> */}

      <div className="logo-wrapper">
        <img width="200" src={logo} className="logo"></img>
      </div>

      <div className="Login">
        <TextField
          label={"Username"}
          color="primary"
          variant="filled"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <h1>- - - - - - - - - - - - - - - -</h1> */}
        <TextField
          label={"Password"}
          color="primary"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: 25 }}
          type="password"
        />
      </div>
      {/* <button onClick={check}>LogIn</button> */}
      <div className="button">
        <Button variant="contained" onClick={check}>
          Sign In
        </Button>
      </div>
      <h3>{status}</h3>
      <h4>
        Don't have an account? <Link to="/signup">Create one</Link>
      </h4>
    </div>
  );
};

export default LogIn;
