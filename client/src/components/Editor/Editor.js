import React, { Component } from 'react';
import { connect } from "react-redux";

// Import Brace and the AceEditor Component
// eslint-disable-next-line
import brace from 'brace';
import AceEditor from 'react-ace';
import { Input, Select, Button} from 'antd';

import io from 'socket.io-client';

// Import a Mode (language)
import 'brace/mode/javascript';
import 'brace/mode/python';

// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/solarized_dark';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/monokai';

import './Editor.scss';

const Option = Select.Option;
const InputGroup = Input.Group;

const socket = io("http://localhost:5001")

class Editor extends Component {

    constructor(props, context) {
        super(props, context);
        this.state ={
            language: 'javascript',
            theme: 'tomorrow',
            code: '',
            room: '',
            users: []
        }

        socket.on('receive code', (payload) => this.updateCodeFromSockets(payload.code));
        socket.on('load users and code', () => this.sendUsersAndCode())
        socket.on('receive users and code', (payload) => this.updateUsersAndCodeInState(payload))
    }

    onChange = (newValue) =>  {
        this.setState({
            code: newValue
        }, () => console.log(this.state.code))
        socket.emit('coding event', {code: newValue, room: this.state.room})
    }

    setTheme = (newTheme) => {
        this.setState({
            theme: newTheme
        })
    }

    componentDidMount() {
        this.setState({
            room: this.props.roomData.roomName,
            language: this.props.roomData.language
        }, () => socket.emit('room', {room: this.state.room}))  
    }

    componentWillUnmount() {
        socket.emit('leave room', {room: this.state.room})
    }
    

    updateCodeFromSockets = (code) => {
        this.setState({
            code: code
        });
    }

    updateUsersAndCodeInState = (payload) => {
        this.setState({
            code: payload.code,
            language: payload.language
        });
    }

    sendUsersAndCode = () =>  {
        socket.emit('send users and code', {room:this.state.room, code: this.state.code, language: this.state.language})
    }
    

    render() {
        const { language, theme, code } = this.state;
        const THEMES =['tomorrow', 'solarized_dark', 'monokai', 'github'];


        return (
            <div className='editor'>
                <div className = 'option'>
                    <InputGroup compact>
                        <Input style={{ width: '75px' }} defaultValue="theme" disabled/>
                        <Select style={{ width: '125px' }} defaultValue={this.state.theme} onChange={this.setTheme}>
                            {THEMES.map(item => (<Option key={item} value={item}>{item}</Option>))}
                        </Select>  
                    </InputGroup>

                    <Button onClick={this.runCode}>run</Button>
                </div>
                <AceEditor
                mode={language}
                theme={theme}
                name="myeditor"
                onChange={this.onChange}
                value={code}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                showLineNumbers: true,
                tabSize: 2,
                showPrintMargin: false
                }}
                />
            </div>
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
};

export default connect(
	mapStateToProps,
	actions
)(Editor);