import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './signup.css';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : "",
      password :"",
      Name:""
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
      password: this.state.password,
      provider:"manual",
      Name :this.state.Name
    };
    console.log(user);
    axios.post('http://localhost:8080/contractor/register',user)
    .then(res => console.log(res))
    .catch(err=>console.log(err));
  }

  render()
  {
    let {email,password,Name} = this.state;
    return(
      //<div className="InputDiv">
      <Container fluid>
        <form action="" className="main-form">
        <label for ="name">Name</label>
        <input type="text" value={Name} name="Name" placeholder="Your Name" onChange={this.handleChangeName} className="form-control"/>
        <label for="email">Email</label>
        <input type="text" value={email} name="email" placeholder="Your Email" onChange={this.handleChangeEmail} className="form-control"/> 
        <label for="password">Password</label>
        <input type="text" value={password} name="password" placeholder="Your Password" onChange={this.handleChangePw} className="form-control"/>

        <button type="button" onClick = {this.handleSubmit} > Submit Form </button>
        <br/><br/><br/>
        <Link to={'/login'}>
          <button type="button">Login Instead</button>
        </Link>
        </form>
      </Container>          
      //</div>
    );
  }
}

export default Login;
