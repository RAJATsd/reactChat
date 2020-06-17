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
            currentUser : null
        }
    }
    componentDidMount()
    {
        Axios.get('http://localhost:8080/contractor/getAll',{headers:{"Authorization":localStorage.getItem("token")}})
        .then(result => {
            this.setState({data:result.data.data,currentUser:result.data.user});            
        })
        .catch(error => console.log(error));
    }

    onChangeDiv = (id,name) => {
        let {clickedDivId,clickedDivName} = this.state;
        clickedDivId = id;
        clickedDivName = name;
        this.setState({clickedDivId:clickedDivId,clickedDivName:clickedDivName});
    }

    render(){
        let dataEleme = this.state.data;
        let listItems = [];
        if(dataEleme){
            for(let oneItem of dataEleme.entries())
            {
                listItems.push(<ListElement info={oneItem} key={oneItem[1].id} clickEvent = {this.onChangeDiv}/>)
            }    
        }
        
        return(
            
            <div className="listBorder">
                {listItems.length>0 && <div className="oyeDiv">{listItems}</div>}
                {this.state.clickedDivId && <TheChatBox id={this.state.clickedDivId} name={this.state.clickedDivName} userId={this.state.currentUser} />}
            </div>
        );
    }
}

export default Info;