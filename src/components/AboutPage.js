import React from "react";
import logo from "./images/logo.png";
import Arrow from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AboutPage.css";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="aboutus">
      <div className="arrow-team111">
        <Arrow sx={{ fontSize: 40 }} onClick={() => navigate(-1)}></Arrow>
        {/* <h3>Teams</h3> */}
        <Link to="/">
          <img width="50px" className="logo-lap" src={logo}></img>
        </Link>
      </div>
      <h1>ABOUT US</h1>
      <h3>
        This app have been designed for those that love and feel the passion of
        this beautiful sport called soccer. The World Cup 2022 is coming and
        there is not better app to follow results, view players and make a
        closer look to your favorite teams.{" "}
      </h3>
    </div>
  );
};

export default AboutPage;
