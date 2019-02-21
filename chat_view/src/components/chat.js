import React from 'react';

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            message: '',
            messages: []
        };
    }
    render() {
        return(
            <div>
                <title>Chat Room</title>
                <div>
                    {/* Chat will go here */}

                </div>
            </div>
        );
    }
}

export default Chat;