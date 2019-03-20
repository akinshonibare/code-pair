import React, { Component } from 'react';
import { Card } from 'antd';
import './FactCard.scss';
import Highlight from 'react-highlight';

class FactCard extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render(){
        return(
            <div style={{ background: '#ECECEC', padding: '10px', marginBottom: '20px', borderRadius: '5px' }}>
                <Card title={this.props.snippet.card_title} bordered={true} style={{ width: 600 }}>
                    <p>{this.props.snippet.card_description}</p>
                    <Highlight language='javascript'>
                        {this.props.snippet.card_code}
                    </Highlight>
                </Card>
            </div>
        );
    }
}

export default FactCard;