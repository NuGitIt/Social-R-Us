import React from 'react';

const Content = (props) => {

    return (
        <div className={props.class} className="postContainer" id={props.class}>
            <a href={props.pageUrl} target="_blank" className="imageContainer">
                <img src={props.imageUrl}/>
            </a>
            <h3 className="titleContainer">{props.title}</h3>
        </div>
    )
}
export default Content;