import React from 'react';
import io from 'socket.io-client';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class InfoAdmin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            socket:null
        };
    }

    componentDidMount(){
        this.initSocket();
    }

    initSocket =()=>{
        const socket = io('http://localhost:8080');
        socket.emit('AdminConnect');
        console.log('initialised socket on frontend');
        socket.on('outside',(args)=>{
            console.log(args);
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
            <Container fluid>
                
            </Container>
        )
    }
}

export default InfoAdmin;