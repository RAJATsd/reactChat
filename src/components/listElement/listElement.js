import React from 'react';
import './listElement.css';
import { render } from '@testing-library/react';

function ListElement (props) {
    return(
        <div className="indElement">
            <button type="button" onClick={()=>props.clickEvent(props.info[1].id,props.info[1].Name)}>
                <h4>{props.info[1].Name}</h4>
                <h4>{props.info[1].id}</h4>
            </button>
            <br/>
        </div>
    );
}

export default ListElement;

