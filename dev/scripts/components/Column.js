import React from 'react';

class Column extends React.Component {
    render() { 
        return (
        <React.Fragment>
            {this.props.children}
        </React.Fragment>
        )
    }
}
 
export default Column;
