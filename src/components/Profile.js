import React from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { param } from "../../../backend/routes/user";
import { get, deleted } from "../services/service";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Profile.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";
import Arrow from "@mui/icons-material/KeyboardBackspace";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    let response = await get(`/user/profile/`);
    console.log(response.data);
    setUser(response.data);
  };

  React.useEffect(function () {
    getUser();
  }, []);

  const deleteUser = async () => {
    let response = await deleted("/user/delete");
    console.log(response.data);
  };
  const logOut = () => {
    localStorage.clear();
    navigate("/team");
  };

  return (
    <div className="profile22">
      <div className="arrow-team3">
        <Arrow sx={{ fontSize: 40 }} onClick={() => navigate(-1)}></Arrow>
        {/* <h3>Teams</h3> */}
        <Link to="/">
          <img width="50px" className="logo-lap" src={logo}></img>
        </Link>
      </div>
      <h1>Profile Details</h1>
      <h3 className="name">Name: {user.fullname}</h3>
      <h3 className="name">Username: {user.username}</h3>
      <h3 className="name">Email: {user.email}</h3>

      <div className="profile-buttons">
        <Stack spacing={2} direction="row">
          <Button className="logout" variant="contained" onClick={logOut}>
            LOGOUT
          </Button>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={deleteUser}
            startIcon={<DeleteIcon />}
            className="delete"
            sx={{ color: red[500] }}
          >
            Delete Account
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default Profile;
