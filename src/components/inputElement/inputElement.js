import React from 'react';

import './inputElement.css';

class InputElement extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      message:""
    }
  }

  handleInputChange = (event) => {
    let {message} = this.state;
    message = event.target.value;
    this.setState({message:message});
  }

  render(){
    return(
      <form className="form">
        <input
          className="input"
          type="text"
          value = {this.state.message}
          placeholder="Type a message..."
          onChange={this.handleInputChange}
          //onKeyPress={event => event.key === 'Enter' ? this.props.sendMessage(this.state.message) : null}
        />
      <button className="sendButton" 
              onClick={
                (event)=>{event.preventDefault();this.props.sendMessage(this.state.message);this.setState({message:""})
                }}
      >
      Send
      </button>
    </form>
    );
  }
}

export default InputElement;