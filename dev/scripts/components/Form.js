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
        <div className="wrapper">
            <form onSubmit={this.props.handleSubmit} className="form" required>
                <label htmlFor="searchInput" className="visuallyhidden">Type Search</label>
                <input type="text" placeholder="search" id="searchInput" name="searchInput" value={this.props.input} onChange={this.getHandleChange}/>
                <button type="submit">Search</button>
            </form>
        </div>
        )
    }
    
}
 
export default Form;