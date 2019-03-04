import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

import ConvoList from './ConvoList/ConvoList';
import ChatView from './ChatView';
import './ChatDashboard.css';
import './ConvoList/ConvoList.css';

class ChatDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            currentConvoId: null,
            currentConvoSocket: null
        }
        this.handleQueueConvoSelect = this.handleQueueConvoSelect.bind(this);
    }

    handleQueueConvoSelect(convo_id, customer_uid) {
        // set rep current convo to selected convo:
        this.setState({
            currentConvoId: convo_id,
            currentConvoSocket: customer_uid
        })
        console.log("ChatDashboard state.currentConvoId: ", this.state.currentConvoId);
        // change convo in_q from true to false:
        const data = { id: convo_id };
        const deQueueRequest = axios.put('/api/chat/dequeue', data);
        deQueueRequest
            .then(response => {
                console.log("Conversation removed from Queue.")
            })
            .catch(error => {
                console.log(error.message);
            })

    }

    render() {
        return (
            <div className="chat-dashboard-container">
                <div className="chat-dash-left-container">
                    <ConvoList handleQueueConvoSelect={this.handleQueueConvoSelect}/>
                </div>
                    
                <div className="chat-dash-right-container">
                    {/* <ChatView currentConvoId={this.sate.currentConvoId}/> */}
                    Chatview
                </div> 
            </div>
        );
    }

}

export default withRouter(ChatDashboard);