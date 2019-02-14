import React from "react";
import Button from "@material-ui/core/Button";

import "./Navigation.css";

const Navigation = () => (
  <div className="navigation-container">
    <Button size="large">Settings</Button>
    <Button size="large">Sign Out</Button>
  </div>
);

export default Navigation;
