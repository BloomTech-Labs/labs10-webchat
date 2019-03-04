import React from "react";
import { withRouter } from "react-router-dom";

import ConvoList from './ConvoList/ConvoList';
import ChatView from './ChatView';
import './ChatDashboard.css';
import './ConvoList/ConvoList.css';

class ChatDashboard extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="chat-dashboard-container">
                <div className="left-container">
                    <ConvoList />
                </div>
                    
                <div className="right-container">
                    {/* <ChatView /> */}
                    Chatview
                </div> 
            </div>
        );
    }

}

export default withRouter(ChatDashboard);