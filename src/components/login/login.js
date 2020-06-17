import React from 'react';
import axios from 'axios';
import { Link,withRouter } from "react-router-dom";


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : "",
      password :"",
    }
  }
  
  handleChangeEmail = (event) => {   //normal to arrow function
    let {email} = this.state;
    email = event.target.value;
    this.setState({email:email})
  }

  handleChangePw = (event) => {
    let {password} = this.state;
    password = event.target.value;
    this.setState({password:password})
  }

  handleChangeName = (event) => {
    let {Name} = this.state;
    Name = event.target.value;
    this.setState({Name:Name})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email : this.state.email,
      password: this.state.password
    };
    console.log(user);
    axios.post('http://localhost:8080/contractor/authenticate',user)
    .then(res =>{
         console.log(res.data.contractorToken);
         localStorage.setItem('token',res.data.contractorToken);
         this.props.history.push('/info');
        })
    .catch(err=>console.log(err));
  }

  render()
  {
    let {email,password} = this.state;
    return(
      <div className="InputDiv">
        Your Email : 
        <input type="text" value={email} placeholder="Your Email" onChange={this.handleChangeEmail}/><br/>
        Your password : 
        <input type="text" value={password} placeholder="Your Password" onChange={this.handleChangePw}/>
        <br/>
        <button type="button" onClick = {this.handleSubmit} > Login </button>       
      </div>
    );
  }
}

export default withRouter(Login);
