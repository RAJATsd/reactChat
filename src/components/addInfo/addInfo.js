import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import io from 'socket.io-client';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import './addInfo.css';
import axios from 'axios';

class AddInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            itemName:'',
            itemDesc:'',
            socket:null,
            notifications:[],
            open:false,
            unread:0
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

    componentDidMount(){
        this.initSocket();
        this.getAllNotifications();
    }

    getAllNotifications = () => {
        //console.log('i am in this');
        axios.get('http://localhost:8080/contractor/allCustomerNotifications')
        .then(response=>{
            console.log(response.data.data);
            const notifications = response.data.data;
            let unread = 0;
            
            for(let ntf of response.data.data){
                if(ntf.isVisited===0){
                    unread = unread+1;
                }
            }
            this.setState({notifications:notifications,unread:unread}); 
        })
        .catch(err=>{
            console.log(err)
        });
    }

    showOrHide = (event) => {
        let {open} = this.state;
        open = !open;
        if(open && this.state.unread!=0)
        {
            this.changeUnreadToRead();
        }
        this.setState({open:open});
    }

    changeUnreadToRead = () => {
        axios.get('http://localhost:8080/contractor/changeNotStatusFromAdmin')
        .then(response=>{
            if(response.data.success){
                let unread = 0;
                this.setState({unread:unread});
            }
        })
        .catch(e=>console.log(e));
    }

    initSocket =()=>{
        const socket = io('http://localhost:8080');
        socket.emit('initConnectNotification',{userId:localStorage.getItem("userId")});
        console.log('initialised socket on frontend');
        socket.on('notificationEvent',(args)=>{
            console.log(args);
            if(!this.state.open){
                let {unread} = this.state;
                unread = unread+1;
                this.setState({unread:unread});
            }
            else{
                this.changeUnreadToRead();
            }
            let {notifications} = this.state;
            notifications.push(args.notification);
            this.setState({notifications:notifications});
        });
        this.setState({socket:socket});
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
                <Row>
                <Form >
                    <Form.Group>
                        <Form.Control type ="text" value={this.state.itemName} placeholder="Enter Item Name" onChange={this.handleChangeName} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" value={this.state.itemDesc} placeholder="Item Description" onChange={this.handleChangeDesc} />
                    </Form.Group>
                    <Button variant="primary" onClick={this.handleSubmit}>Add TO DB</Button>
                </Form>
                </Row>
                <Row>
                <Button variant="secondary" onClick={this.showOrHide}>Notifications-{this.state.unread} unread</Button>
                {this.state.open && this.state.notifications.map((nofify,i)=><Alert className="clickableAlerts" key={i} variant="dark">{nofify.description}</Alert>)}
                </Row>
            </Container>
        )
    }
}

export default AddInfo;