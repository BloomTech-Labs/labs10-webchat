import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

import ConvoList from './ConvoList/ConvoList';
import ChatView from './ChatView';
import './ChatDashboard.css';
import './ConvoList/ConvoList.css';
import Navigation from '../Navigation';
import '../Navigation.css'

class ChatDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            currentConvoId: null,
            currentConvoSocket: null,
            currentConvoSummary: null,
            currentCustomerName: null,
            currentMessages: [],
            convoSelected: false
        }
        this.handleQueueConvoSelect = this.handleQueueConvoSelect.bind(this);
        this.handleActiveConvoSelect = this.handleActiveConvoSelect.bind(this);
        this.closeConvo = this.closeConvo.bind(this);
        // this.addMessage = this.addMessage.bind(this);
    }

    // addMessage(newMessage) {
    //     console.log("newMessage in ChatDash: ", newMessage);
    //     const currentMessages = [];
    //     this.state.currentMessages.forEach(message => {
    //         currentMessages.push({...message});
    //     });
    //     currentMessages.push(newMessage);
    //     this.setState({ currentMessages });
    // }

    handleQueueConvoSelect(convo_id, customer_uid, customer_name, summary) {
        const id = convo_id;
        const messageRequest = axios.get(`/api/chat/messages/${id}`);
        messageRequest
            .then(response => {
                console.log("Response from ChatDash Queue GET messages: ", response);
                this.setState({
                    convoSelected: true,
                    currentConvoId: convo_id,
                    currentConvoSocket: customer_uid,
                    currentConvoSummary: summary,
                    currentCustomerName: customer_name,
                    currentMessages: response.data
                }, () => {
                    console.log("\nQueue Convo Selected. ChatDashboard state: ", this.state);
                });
            })
            .catch(error => {
                console.log(error.message);
                //this.setState({error:error});
            });
        // Remove convo from the Queue by updating in_q to false in the convo's db entry
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

    handleActiveConvoSelect(convo_id, customer_uid, customer_name, summary) {
        const id = convo_id;
        const messageRequest = axios.get(`/api/chat/messages/${id}`);
        messageRequest
            .then(response => {
                console.log("Response from ChatDash Active GET messages: ", response);
                this.setState({
                    convoSelected: true,
                    currentConvoId: convo_id,
                    currentConvoSocket: customer_uid,
                    currentConvoSummary: summary,
                    currentCustomerName: customer_name,
                    currentMessages: response.data
                }, () => {
                    console.log("\nActive Convo Selected. ChatDashboard state: ", this.state);
                });
            })
            .catch(error => {
                console.log(error.message);
                //this.setState({error:error});
            });
    }

    handleClosedConvoSelect(convo_id, customer_uid, customer_name, summary) {
        const id = convo_id;
        const messageRequest = axios.get(`/api/chat/messages/${id}`);
        messageRequest
            .then(response => {
                console.log("Response from ChatDash Closed GET messages: ", response);
                this.setState({
                    convoSelected: true,
                    currentConvoId: convo_id,
                    currentConvoSocket: customer_uid,
                    currentConvoSummary: summary,
                    currentCustomerName: customer_name,
                    currentMessages: response.data
                }, () => {
                    console.log("\nClosed Convo Selected. ChatDashboard state: ", this.state);
                });
            })
            .catch(error => {
                console.log(error.message);
                //this.setState({error:error});
            });
    }

    closeConvo() {
        const data = { id: this.state.currentConvoId };
        console.log("close convo data: ", data);
        axios.put('/api/chat/close', data)
        .then(response => {
            console.log("Conversation closed.")
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    render() {
        const convoSelected = this.state.convoSelected;
        return (
            <div>
            <Navigation />
            <div className="chat-dashboard-container">
                <div className="chat-dash-left-container">
                    <ConvoList
                        handleQueueConvoSelect={this.handleQueueConvoSelect}
                        handleActiveConvoSelect={this.handleActiveConvoSelect}
                        handleClosedConvoSelect={this.handleClosedConvoSelect}
                    />
                </div>

                <div className="chat-dash-right-container">
                    {/* {!convoSelected ? (
                        <p>No conversation selected.</p>

                        ) : (
                            <ChatView
                            currentConvoId={this.state.currentConvoId}
                            currentConvoSocket={this.state.currentConvoSocket}
                            summary={this.state.currentConvoSummary}
                            messages={this.state.currentMessages}
                            customerName={this.state.currentCustomerName}
                            closeConvo={this.closeConvo}
                            />
                        )
                    } */}
                    <ChatView
                            currentConvoId={this.state.currentConvoId}
                            currentConvoSocket={this.state.currentConvoSocket}
                            summary={this.state.currentConvoSummary}
                            messages={this.state.currentMessages}
                            customerName={this.state.currentCustomerName}
                            addMessage={this.addMessage}
                            closeConvo={this.closeConvo}
                    />
                </div>
            </div>
            </div>
        );
    }

}

export default withRouter(ChatDashboard);
