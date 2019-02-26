import React, { Component } from "react";
import "./DummyWebsite.css";

import Button from "@material-ui/core/Button";

class DummyWebsite extends Component {
    render() {
        return (
            <div className="dummy-website">
                <div className="dummy-top-info">
                    <h1>Joes Plumbing</h1>
                    <p>10800 Greene Street</p>
                    <p>1-800-456-7890</p>
                    <p>Monday-Saturday 9:00-5:00</p>
                </div>
                <div className="dummy-navigation-container">
                    <p className="navigation-link">HOME</p>
                    <p className="navigation-link">ABOUT</p>
                    <p className="navigation-link">SERVICES</p>
                    <p className="navigation-link">PRODUCTS</p>
                    <p className="navigation-link">BLOG</p>
                    <p className="navigation-link">GET APPOINTMENT</p>
                </div>
                <div className="dummy-info">
                    <h3>Joe's Plumbing</h3>
                    <ul>
                        <li>Upfront, Flat Rate Pricing</li>
                        <li>Never an Overtime Charge</li>
                        <li>Courtous, Uniformed Professionals</li>
                    </ul>
                    <Button variant="contained" color="secondary" className="upload-button">
                        REQUEST AN APPOINTMENT
          </Button>
                </div>
            </div>
        );
    }
}

export default DummyWebsite;
