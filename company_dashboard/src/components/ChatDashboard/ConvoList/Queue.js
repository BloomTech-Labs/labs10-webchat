import React from 'react';
import { Link, withRouter} from "react-router-dom"
import axios from 'axios';

class Queue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: []
        }
    }

    componentDidMount() {
        const getQueue = axios.get('/api/chat/queue')
        getQueue 
            .then(q => {
                console.log("getQueue request success");
                this.setState({ 
                    conversations: q.data  // q.data should be an array of objects, each containing rep_name, rep_company_id, customer_uid, summary, customer_name
                });
            })
            .catch(error => {
                console.log(error.message);
            })
    }


    render() {
        return (
            <div>
                {this.state.conversations.map((convo, index) => {
                    return (
                        <div 
                            className="convo-list-item" 
                            key={index}
                            onClick={() => this.props.handleQueueConvoSelect(convo.convo_id, convo.customer_uid)}
                        >
                            <p>Customer: {convo.customer_name}</p>
                            
                            <p>Summary: {convo.summary}</p>

                            <p>Convo ID: {convo.convo_id}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default withRouter(Queue);