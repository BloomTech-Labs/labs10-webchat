import React from 'react';
import { Link, withRouter} from "react-router-dom"
import axios from 'axios';

class ActiveConvos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: []
        }
    }

    componentDidMount() {
        const getActive = axios.get('/api/chat/active')
        getActive 
            .then(active => {
                console.log("getActive request success");
                this.setState({ 
                    conversations: active.data  // active.data should be an array of objects, each containing rep_name, rep_company_id, customer_uid, summary, customer_name
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
                            onClick={() => this.props.handleActiveConvoSelect(convo.convo_id, convo.customer_uid, convo.summary)}
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

export default withRouter(ActiveConvos);