// This component is displayed on the right side of ChatDashboard
// It shows the signed-in rep's current conversation
// Props: receives currentConvoId from chatDashboard
//        receives currentConvoSocket from chatDashboard

import React from 'react';
import axios from 'axios';

class ChatView extends React.Component {
    constructor() {
        super();
        
    }

    componentDidMount() {
        // subscribe to socket room
        // get all messages in the convo
    }

    render() {
        const summary = this.props.summary;
        return (
            <div>
                
                {summary ? (<p>{summary}</p>) : (<p>No summary yet</p>)}
            </div>
        );
    }

}


export default ChatView;