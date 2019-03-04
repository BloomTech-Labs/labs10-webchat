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
            currentConvoId: null
        }
    }

    handleQeueConvoSelect(convo_id) {
        // set rep current convo to selected convo:
        this.setState({
            currentConvoId: convo_id
        })
        // change convo in_q from true to false:
        

    }

    render() {
        return (
            <div className="chat-dashboard-container">
                <div className="chat-dash-left-container">
                    <ConvoList handleQeueConvoSelect={this.handleQeueConvoSelect}/>
                </div>
                    
                <div className="chat-dash-right-container">
                    {/* <ChatView /> */}
                    Chatview
                </div> 
            </div>
        );
    }

}

export default withRouter(ChatDashboard);