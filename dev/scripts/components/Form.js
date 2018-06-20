import React from 'react';


class Form extends React.Component {
    constructor(){
        super();
        this.getHandleChange = this.getHandleChange.bind(this)
    }

    getHandleChange(e){
        console.log(e.target.value);
        this.props.handleChange(e.target.value);
        
    }
    render (){
        return ( 
            <form onSubmit={this.props.handleSubmit}>
                <input type="text" placeholder="search" value={this.props.input} onChange={this.getHandleChange}/>
                <button type="submit">Submit</button>
            </form>
        )
    }
    
}
 
export default Form;