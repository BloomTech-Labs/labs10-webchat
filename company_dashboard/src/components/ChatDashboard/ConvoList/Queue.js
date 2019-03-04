import React from 'react';
import { Link, withRouter} from "react-router-dom"
import axios from 'axios';

class Queue extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div>Queue</div>
        )
    }
}

export default withRouter(Queue);