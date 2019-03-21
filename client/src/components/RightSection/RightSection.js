import React, { Component } from 'react';
import './RightSection.scss';

class FactCard extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render(){
        return(
            <div className='rightsection'>
                <code>
                    {this.props.result}
                </code>
            </div>
        );
    }
}

export default FactCard;