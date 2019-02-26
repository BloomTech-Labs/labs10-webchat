import React, { Component } from "react";
import "./DummyWebsite.css";

import Button from "@material-ui/core/Button";

class DummyWebsite extends Component {
    render() {
        return (
            <div className="dummy-website">
                <div className="navigation-container">
                    <Button size="large">Home</Button>
                    <Button size="large">About</Button>
                    <Button size="large">Products</Button>
                    <Button size="large">Services</Button>
                    <Button size="large">FAQ</Button>
                </div>
                <div className="dummy-info">
                    <h1>Mario's Plumbing</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                        nulla tellus, pellentesque eu justo ac, mollis auctor enim. Donec
                        luctus scelerisque pharetra. Morbi accumsan porttitor tortor, non
                        elementum mauris faucibus a. Mauris enim arcu, sagittis a tortor at,
                        tincidunt consectetur ex. In vitae varius nisi, a elementum eros.
                        Nulla dapibus eleifend neque, volutpat suscipit massa viverra nec.
                        Donec quis sodales lorem, sed facilisis magna. Vivamus scelerisque
                        at enim tempus tincidunt. In fermentum rutrum tempus. Ut a odio eu
                        diam cursus hendrerit. Etiam nisi mi, fringilla ut risus vel, ornare
                        molestie mi. Etiam elementum nunc ex, a venenatis ligula dictum ut.
                        Vivamus sit amet ipsum a neque pellentesque sodales.
          </p>
                    <Button variant="outlined" color="primary" className="upload-button">
                        Get Started
          </Button>
                </div>
            </div>
        );
    }
}

export default DummyWebsite;
