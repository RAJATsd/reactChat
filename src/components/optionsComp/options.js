import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Options (props){
    return(
        <Container fluid>
        <a href="/info">
            <Button variant="primary"> Go To Chat Box</Button>
        </a>
        <br/>
        <br/>
        <a href="/addInfo">
            <Button variant="primary">Go to add info</Button>
        </a>
        </Container>
    )
}

export default Options;