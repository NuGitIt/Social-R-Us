import React from 'react';

const Content = (props) => {
    return (
        <div className={props.class}>
            <h2>{props.title}</h2>
            <a href={props.pageUrl} target="_blank">
            <img src={props.imageUrl} style={{'width':'100px'}}/>
            </a>
        </div>
    )
}
export default Content;