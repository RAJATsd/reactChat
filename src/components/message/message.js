import React from 'react';
import'./message.css';

function Message (props) {
    let isSentByUser = false;
    if(props.user == props.from)
    {
        isSentByUser = true;
    }
    return(
        isSentByUser?(
            <div className="messageContainer justifyStart">
              <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">{props.msg}</p>
              </div>
            </div>
            )
            : (
              <div className="messageContainer justifyEnd">
                <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{props.msg}</p>
                </div>
              </div>
            )
    );
}

export default Message;