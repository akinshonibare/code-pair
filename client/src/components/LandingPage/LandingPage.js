import React, { Component } from 'react';
import {Button} from 'antd';
import './LandingPage.scss';
// import FactCard from '../FactCard/FactCard';
import {getsnippets} from '../../actions/snippetsAction';

class LandingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: undefined,
        }
    }

    componentDidMount() {
        getsnippets().then(res => {
            this.setState({
                data: res.data.result
            })
        })
    }

    render(){
        if(!this.state.data){
            return <div/>
        }else{
        return(
            <div className='landingpage-wrapper'>  
                {/* <FactCard snippet={this.state.data}/> */}
                <Button style={{ width: 620 }} onClick={this.props.onLoginClick}>Enter</Button>
            </div>
        );
        }
    }
}

export default LandingPage;