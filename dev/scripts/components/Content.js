import React from 'react';

const Content = (props) => {

    return (
        <div className={props.class} className="postContainer">
            <a href={props.pageUrl} target="_blank" className="imageContainer">
                <img src={props.imageUrl}/>
            </a>
            <h2 className="titleContainer">{props.title}</h2>
        </div>
    )
}
export default Content;