import React from 'react';
import './messages.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../message/message';

class Messages extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <ScrollToBottom className="messages">
                {this.props.messages.map((message,i)=><div key={i}><Message msg={message.message} from={message.receiverId} user={this.props.user}/></div>)}
            </ScrollToBottom>
        );
    }
}

export default Messages;