import React from 'react';

const Content = (props) => {
    return (
        <React.Fragment>
            <h2>{props.title}</h2>
            <img src={props.url} style={{'width':'100px'}}/>
            <div>{props.abstract}</div>
        </React.Fragment>
    )
}
export default Content;