import React from 'react';
import Axios from 'axios';
import ListElement from '../listElement/listElement';
import TheChatBox from '../chatbox/theChatBox';
import './info.css';
import io from 'socket.io-client';
//import { mockComponent } from 'react-dom/test-utils';

class Info extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : null,
            clickedDivId : null,
            clickedDivName : null,
            currentUser : null,
            socket : null,
            unreadMsgList : {}
        }
    }
    componentDidMount()
    {
        Axios.get('http://localhost:8080/contractor/getAll',{headers:{"Authorization":localStorage.getItem("token")}})
        .then(result => {
            this.setState({data:result.data.data,currentUser:result.data.user},()=>{
                this.initSocket();
            });            
        })
        .catch(error => console.log(error));
    }

    onChangeDiv = (id,name) => {
        let {clickedDivId,clickedDivName} = this.state;
        clickedDivId = id;
        clickedDivName = name;
        this.setState({clickedDivId:clickedDivId,clickedDivName:clickedDivName});
        const unreadMsgs = this.state.unreadMsgList;
        if(unreadMsgs[clickedDivId]){
            unreadMsgs[clickedDivId]=0;
            this.setState({unreadMsgList:unreadMsgs});
            this.changeUnreadToRead(clickedDivId,3);
        }
    }

    increaseUnread = (senderId) => {
        const unreadMsgs = this.state.unreadMsgList;
        if(unreadMsgs[senderId]){
            unreadMsgs[senderId]=unreadMsgs[senderId]+1;
        }
        else{
            unreadMsgs[senderId]=1;
        }
        this.setState({unreadMsgList:unreadMsgs});
    }

    changeUnreadToRead = (senderId,tableNo) => {
        const senderInfo = {
            senderId:senderId,
            tableNo:tableNo
        }; 
        const options = {
            headers:{"Authorization":localStorage.getItem("token")}
        };
        Axios.post('http://localhost:8080/contractor/updateURtoR',senderInfo,options)
        .then(data=>{
            console.log('updated');
        })
        .catch(e=>{
            console.log(e);
        });
    }

    initSocket =()=>{
        const socket = io('http://localhost:8080');
        socket.emit('initalConn',{user:this.state.currentUser});
        console.log('initialised socket on frontend');
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
        this.setState({socket:socket},()=>{
            Axios.get('http://localhost:8080/contractor/unread/'+this.state.currentUser,{headers:{"Authorization":localStorage.getItem("token")}})
            .then(result => {
                if(result.data.reason === 1){
                    const unreadMsgs = result.data.messages;
                    this.setState({unreadMsgList:unreadMsgs});
                }           
            })
            .catch(error => console.log(error));
        });
    }

    render(){
        let dataEleme = this.state.data;
        let listItems = [];
        if(dataEleme){
            for(let oneItem of dataEleme.entries())
            {
                listItems.push(
                    <ListElement 
                        info={oneItem} 
                        key={oneItem[1].id} 
                        unreadCount={this.state.unreadMsgList[oneItem[1].id]} 
                        clickEvent = {this.onChangeDiv}
                    />
                )
            }    
        }
        
        return(
            
            <div className="listBorder">
                {listItems.length>0 && <div className="oyeDiv">{listItems}</div>}
                {this.state.clickedDivId 
                 && 
                 <TheChatBox 
                    id={this.state.clickedDivId} 
                    name={this.state.clickedDivName} 
                    userId={this.state.currentUser} 
                    socket={this.state.socket} 
                    msgStatus={this.changeUnreadToRead} 
                    incUnread = {this.increaseUnread} 
                 />
                }
            </div>
        );
    }
}

export default Info;