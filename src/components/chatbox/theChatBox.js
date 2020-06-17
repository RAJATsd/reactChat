import React from 'react';
import './theChatBox.css'
import InputElement from '../inputElement/inputElement';
import io from 'socket.io-client';
import axios from 'axios';
import Messages from '../messages/messages';

class ChatBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            socket:null,
            chats : {}
        }
    }

    handleSendMessage = (message)=>{
        const {socket} = this.state;
        if((this.props.id in this.state.chats)==false)
        {
            socket.emit('first message',({message:message,to:this.props.id,from:this.props.userId}));
            this.getHistory();
        }
        else{
            socket.emit('send message',({convoId:this.state.chats[this.props.id][0].conversationId,message:message,to:this.props.id,from:this.props.userId}));
            const {chats} = this.state;
            chats[this.props.id].push({senderId:this.props.userId,receiverId:this.props.id,message:message});
            this.setState({chats:chats});
        }
    }

    componentDidMount(){
        this.initSocket();
    }

    componentDidUpdate(){
        if(this.props.id in this.state.chats==false){
            this.getHistory();
        }
    }

    getHistory = () => {
            axios.get('http://localhost:8080/contractor/ifConvo/'+this.props.id,{headers:{"Authorization":localStorage.getItem("token")}})
            .then(result => {
                console.log(result);
                if(result.data.success){
                    let {chats} = this.state;
                    chats[this.props.id] = result.data.messages;
                    this.setState({chats:chats});
                }
            })
            .catch(error =>{
                console.log(error)
            });
    }

    initSocket =()=>{
        const socket = io('http://localhost:8080');
        socket.emit('initalConn',{user:this.props.userId});
        socket.on('new message',(args)=>{
            console.log(args);
            if(this.props.id in this.state.chats==false){
                this.getHistory();
            }
            else{
                const {chats} = this.state;
                console.log(chats);
                chats[args.from].push({senderId:args.from,receiverId:this.props.userId,message:args.message});
                this.setState({chats:chats});
            }
        });
        this.setState({socket:socket});
    }

    render(){
        return(
            <div className="chatBox">
                <h3>{this.props.name} - {this.props.id}</h3>
                {this.state.chats[this.props.id] && <Messages messages ={this.state.chats[this.props.id]} user={this.props.userId} />}
                <InputElement sendMessage={this.handleSendMessage}/>
            </div>
        )
    }
}

export default ChatBox;