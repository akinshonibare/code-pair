import React, { Component } from 'react';
import { Modal, Input, Select} from 'antd';
import { connect } from "react-redux";
import randomstring from "randomstring";
import { setRoomData } from '../../actions/infoAction';

const InputGroup = Input.Group;
const Option = Select.Option;

class CreateRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            language: 'python',
            room: randomstring.generate({length: 12,charset: 'alphabetic'})
       }
    }

    setLanguage = (value) => {
        this.setState({
            language: value
        })
    }


    setRoom = () => {
        let room = {
            language: this.state.language,
            roomName: this.state.room
        }
        
        this.props.setRoomData(room)
        this.props.setModalVisible(false)
        this.props.setInRoom(true)
    }

    render(){
        const LANGUAGES = ['python', 'javascript']
        return(
            <Modal
            title="Create Room"
            visible={this.props.modalVisible}
            onOk={() => this.setRoom()}
            onCancel={() => this.props.setModalVisible(false)}
          >
            <Input addonBefore="room" style={{ width: '100%' }} defaultValue={this.state.room} disabled/> 
            <br/>
            <br/>
            <InputGroup compact>
                <Select style={{ width: '50%' }} defaultValue={this.state.language} onChange={this.setLanguage}>
                    {LANGUAGES.map((item, i) => <Option key={i} value={item}>{item}</Option>)}
                </Select>        
            </InputGroup>
          </Modal>
        );
    }
}

function mapStateToProps(state) {
	return {
        userData: state.pageInfo.userData,
        roomData: state.pageInfo.roomData
	};
}

const actions = {
	setRoomData
};

export default connect(
	mapStateToProps,
	actions
)(CreateRoom);
