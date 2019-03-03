import React, { Component } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import Button from "@material-ui/core/Button";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="navigation-container">
          <Button size="large">
            <Link to={ROUTES.REPS_LOGIN}>Sign In</Link>
          </Button>
          <Button size="large">
            <Link to={ROUTES.REP_REGISTER}>Sign Up</Link>
          </Button>
          <img
            className="netlify-logo"
            src={require("./images/logomark.png")}
            alt="Netlify logo"
          />
        </div>
        <div className="landing-info">
          <h1>Chattr</h1>
          <p>
            Welcome to Chattr, the new way to chat with your customers.
          </p>
          {/* <Button variant="outlined" color="primary" className="upload-button">
            Get Started
          </Button> */}
        </div>
      </div>
    );
  }
}

export default LandingPage;
