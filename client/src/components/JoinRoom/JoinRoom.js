import React, { Component } from 'react';
import { Modal, Input} from 'antd';
import { connect } from "react-redux";
import { setRoomData } from '../../actions/infoAction';


class JoinRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            room: ''
       }
    }

    setRoom = (e) => {
        this.setState({
            room: e.target.value
        });
    }

    getRoom = () => {
        let room = {
            roomName: this.state.room
        }
        this.props.setRoomData(room)
        this.props.setModalVisible(false)
        this.props.setInRoom(true)
    }

    render(){
        return(
            <Modal
            title="Join Room"
            visible={this.props.modalVisible}
            onOk={() => this.getRoom()}
            onCancel={() => this.props.setModalVisible(false)}
          >
            <Input addonBefore="room" style={{ width: '100%' }} value={this.state.room} onChange={this.setRoom}/>       

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
)(JoinRoom);
