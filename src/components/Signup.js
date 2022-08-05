import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { post } from "../services/service";
import "./Signup.css";
import TextField from "@mui/material/TextField";
import logo from "../components/images/logo.png";
import Button from "@mui/material/Button";
import Arrow from "@mui/icons-material/KeyboardBackspace";

const Signup = () => {
  const [fullname, setFullname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");

  const navigate = useNavigate();

  const navigateCreate = () => {
    navigate("/");
  };

  const check = async (e) => {
    e.preventDefault();
    if (!fullname || !password || !email) {
      setStatus("Please enter valid credentials for your account.");
    }
    if (password.length < 6) {
      setStatus("Password should be 6 characters or longer ");
    }
    if (password !== password2) {
      setStatus("Password doesn't match");
    } else {
      try {
        let response = await post("/user/signup", {
          fullname: fullname,
          username: username,
          password: password,
          email: email,
          // phone: phone,
          profilePic: imgUrl,
        });
        console.log(response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        // setStatus("welcome");
        navigateCreate();
      } catch (err) {
        console.error(err.message);
        setStatus("Password or username is incorrect");
      }
    }
  };
  const handleFileUpload = async (e) => {
    setLoading(true);
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    let response = await post("/user/add-picture", uploadData);
    // console.log("moment of truth", response.data);
    setImgUrl(response.data.path);
    setLoading(false);
  };

  return (
    <div className="signup-main">
      <div className="arrow-team1">
        <Arrow sx={{ fontSize: 40 }} onClick={() => navigate(-1)}></Arrow>
        {/* <h3>Teams</h3> */}
        <Link to="/">
          <img width="50px" className="logo-lap" src={logo}></img>
        </Link>
      </div>
      <div className="logo-wrapper">
        <img width="130" src={logo} className="logo"></img>
      </div>
      {/* <form onSubmit={check}> */}
      <div className="Signup">
        <TextField
          label={"Full Name"}
          color="primary"
          variant="filled"
          onChange={(e) => setFullname(e.target.value)}
        />
        <TextField
          label={"Username"}
          color="primary"
          variant="filled"
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginTop: 25 }}
        />
        <TextField
          label={"Email"}
          color="primary"
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginTop: 25 }}
        />
        <TextField
          label={"Password"}
          color="primary"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginTop: 25 }}
          type="password"
        />
        <TextField
          label={"Re-Enter Password"}
          color="primary"
          variant="filled"
          onChange={(e) => setPassword2(e.target.value)}
          style={{ marginTop: 25 }}
          type="password"
        />
        {/* <label>PIC</label> */}
        {/* <input type="file" onChange={handleFileUpload} /> */}
        {/* <img width="70" src={imgUrl}></img> */}
        <div className="button2">
          <Button onClick={check} disabled={loading} variant="contained">
            Sign Up
          </Button>
        </div>
      </div>
      <h4>{status}</h4>
      <h4>
        Already have an account? <Link to="/login">LogIn</Link>
      </h4>

      {/* </form> */}
    </div>
  );
};

export default Signup;
