import React from 'react';
import axios from 'axios';
import { Link,withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email : "",
      password :"",
      email2:"",
      password2:""
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

  handleChangePw2 = (event) => {
    let {password2} = this.state;
    password2 = event.target.value;
    this.setState({password2:password2});
  }

  handleChangeEmail2 = (event) => {
    let {email2} = this.state;
    email2 = event.target.value;
    this.setState({email2:email2})
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
         if(res.data.success){
         localStorage.setItem('token',res.data.contractorToken);
         this.props.history.push('/options');
        }
    })
    .catch(err=>console.log(err));
  }

  handleSubmit2 = (event) => {
    event.preventDefault();
    const user = {
      adminId : this.state.email2,
      password: this.state.password2
    };
    //console.log(user);
    axios.post('http://makeyourcloth.com/admin/authenticate',user)
    .then(res =>{
         if(res.data.success){
          this.props.history.push('/info2');
         }
         else{
           console.log('kuch shi daal le bhai. Abi b galat hi daal rha h');
         }
         //localStorage.setItem('token',res.data.contractorToken);
        })
    .catch(err=>console.log(err));
  }

  render()
  {
    let {email,password,email2,password2} = this.state;
    return(
      <Container>
        <Row>
          <Col>
            <div className="InputDiv">
              Your Email : 
              <input type="text" value={email} placeholder="Your Email" onChange={this.handleChangeEmail}/><br/>
              Your password : 
              <input type="text" value={password} placeholder="Your Password" onChange={this.handleChangePw}/>
              <br/>
              <button type="button" onClick = {this.handleSubmit} > Login </button>       
            </div>
          </Col>
          <Col>
            <Form>
              <Form.Group>
                <Form.Control type="text" placeholder="email" value={email2} onChange={this.handleChangeEmail2} />
              </Form.Group>
              <Form.Group>
                <Form.Control type="password" placeholder="password" value={password2} onChange={this.handleChangePw2} />
              </Form.Group>
              <Button variant="primary" onClick={this.handleSubmit2}>Submit</Button>
            </Form>            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Login);
