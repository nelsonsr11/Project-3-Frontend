import React from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { param } from "../../../backend/routes/user";
import { get, deleted } from "../services/service";
import axios from "axios";

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

  const logOut = () => {
    localStorage.clear();
    navigate("/team");
  };

  const deleteUser = async () => {
    let response = await deleted("/user/delete");
    console.log(response.data);
  };

  return (
    <div>
      <h1>This is profile</h1>
      <p>{user.fullname}</p>
      <button onClick={logOut}>LOGOUT</button>
      <button onClick={deleteUser}></button>
    </div>
  );
};

export default Profile;
