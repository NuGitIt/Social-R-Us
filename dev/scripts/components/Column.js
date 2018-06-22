import React from 'react';

class Column extends React.Component {
    render() { 
        return (
        <div className="column">
        <h2 className="column-title">{this.props.social}</h2>
            {this.props.children}
        </div>
        )
    }
}
 
export default Column;
