import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';

class AddInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            itemName:'',
            itemDesc:''
        }
    }

    handleChangeName = (event) => {
        const itemName = event.target.value;
        this.setState({itemName:itemName});
    }

    handleChangeDesc = (event) => {
        const itemDesc = event.target.value;
        this.setState({itemDesc:itemDesc});
    }

    handleSubmit = (event) => {
        console.log('i am here');
        const data = {
            itemName:this.state.itemName,
            itemDesc:this.state.itemDesc
        }
        const options = {
            headers:{"Authorization":localStorage.getItem("token")}
        };
        Axios.post('http://localhost:8080/contractor/insertDummy',data,options)
        .then(data=>{
            console.log(data);
        })
        .catch(e=>{
            console.log(e);
        });
    }

    render(){
        return(
            <Container className="align-items-center">
                <Form >
                    <Form.Group>
                        <Form.Control type ="text" value={this.state.itemName} placeholder="Enter Item Name" onChange={this.handleChangeName} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" value={this.state.itemDesc} placeholder="Item Description" onChange={this.handleChangeDesc} />
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>Add TO DB</Button>
                </Form>
            </Container>
        )
    }
}

export default AddInfo;