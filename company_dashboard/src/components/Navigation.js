import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./Navigation.css";

library.add(faCog);

const Navigation = () => (
  <div className="navigation-container">
    <FontAwesomeIcon icon="cog" size="2x" />
    <p>Log Out</p>
  </div>
);

export default Navigation;
