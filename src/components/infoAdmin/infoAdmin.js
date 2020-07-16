import React from 'react';
import io from 'socket.io-client';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class InfoAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            socket:null,
            notifications:[],
            open:false,
            unread:0
        };
    }

    componentDidMount(){
        this.initSocket();
        this.getAllNotifications();
    }

    getAllNotifications = () => {
        //console.log('i am in this');
        axios.get('http://localhost:8080/contractor/allNotifications')
        .then(response=>{
            console.log(response.data.data);
            const notifications = response.data.data;
            let unread = 0;
            for(let ntf of response.data.data){
                if(ntf.isRead===0){
                    unread = unread+1 ;
                }
            }
            this.setState({notifications:notifications,unread:unread}); 
        })
        .catch(err=>{
            console.log(err)
        });
    }

    changeUnreadToRead = () => {
        axios.get('http://localhost:8080/contractor/changeNotStatus')
        .then(response=>{
            if(response.data.success){
                let unread = 0;
                this.setState({unread:unread});
            }
        })
        .catch(e=>console.log(e));
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

    initSocket =()=>{
        const socket = io('http://localhost:8080');
        socket.emit('AdminConnect');
        console.log('initialised socket on frontend');
        socket.on('outside',(args)=>{
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
        // socket.on('new message',(args)=>{
        //     console.log(args);
        //     if(this.props.id in this.state.chats==false){
        //         this.getHistory();
        //     }
        //     else{
        //         const {chats} = this.state;
        //         console.log(chats);
        //         chats[args.from].push({senderId:args.from,receiverId:this.props.userId,message:args.message});
        //         this.setState({chats:chats});
        //     }
        // });
        this.setState({socket:socket});
    }

    render(){
        return(
            <Container className="align-items-center">
                <Button variant="secondary" onClick={this.showOrHide}>Notifications-{this.state.unread} unread</Button>
                {this.state.open && this.state.notifications.map((nofify,i)=><Alert variant="dark" key={i}>{nofify.notificationText}</Alert>)}
            </Container>
        )
    }
}

export default InfoAdmin;