import React, { Component } from 'react';
import { connect } from "react-redux";
import { Layout, Button, Avatar, Empty, Popconfirm, Tag, Timeline, Icon } from 'antd';
import { Widget, addResponseMessage } from 'react-chat-widget';
import CreateRoom from '../CreateRoom/CreateRoom';
import RightSection from '../RightSection/RightSection';
import JoinRoom from '../JoinRoom/JoinRoom';
import PanelGroup from 'react-panelgroup';
import Editor from '../Editor/Editor';
import { runPythonCode } from '../../actions/runCode';
import { setRoomData } from '../../actions/infoAction';
import _ from 'lodash';
import './Dashboard.scss';
import 'react-chat-widget/lib/styles.css';
import VideoComponent from '../VideoComponent/VideoComponent';

const { Header, Footer, Sider, Content } = Layout;

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            Inroom: false,
            createroommodal: false,
            joinroommodal: false,
            result: undefined,
            codeFromFile: undefined,
            users: [],
            currentlyTyping: null
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.userData !== this.props.userData){
            console.log(this.props.userData)
        }
    }

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }

    setUsers = (users) => {
        this.setState({
            users: users
        })
    }

    setCurrentlyTyping = (user) => {
        this.setState({
            currentlyTyping: user
        })
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    createRoomVisible = (visible) => {
        this.setState({ createroommodal: visible });
    }

    joinRoomVisible = (visible) => {
        this.setState({ joinroommodal: visible });
    }

    

    setInRoom = (value)=> {
        this.setState({
            Inroom: value
        })
    }

    confirm = (e) => {
        this.props.onLogoutClick();
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        if(newMessage === 'hi' || newMessage === 'hey'){
            addResponseMessage("hello");
        }else if(newMessage === 'bye'){
            addResponseMessage("goodbye");
        }else{
            addResponseMessage("i dont understand")
        }
      }
      
    run = (code, language) => {
        let value = code;
        if(language === 'python'){
            runPythonCode(value).then(result => {
                this.setState({
                    result: result.data.result
                })
            })
        }else{
            this.setState({
                result: "language not supported"
            })
        }
    }

    setCodeFromFile = (code) => {
        this.setState({
            codeFromFile: code
        })
    }
    
    render(){
        if(_.isEmpty(this.props.userData)){
            return <div/>
        }else{
            return (
            <div className='dashboard'>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo">
                        <Avatar size='large' src={this.props.userData.photo} />
                    </div>
                    <div style={{textAlign: 'center'}}>
                        {this.state.Inroom && (
                            <Tag> {this.props.roomData.roomName}</Tag>
                        )}
                        <div className='users'>
                          <Timeline>
                            {this.state.users.map(user => (
                                // <Timeline.Item dot={this.state.currentlyTyping === user && <Icon type="ellipsis"/>} key={user}>{user.split('-')[0]}</Timeline.Item>
                                <Timeline.Item color={this.state.currentlyTyping === user ? "green" : "blue"} key={user}>{user.split('-')[0]}</Timeline.Item>
                            ))}
                        </Timeline>
                        </div>
                    </div>
                    <Popconfirm title="Are you sure you want to log out?" placement='right' onConfirm={this.confirm} okText="Yes" cancelText="No">
                        <Button type="primary" style={{ width: '50%', position: 'absolute', bottom: '50px', left: '25%' }}>log out</Button>                 
                    </Popconfirm>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0}}>                 
                            {this.state.Inroom && <VideoComponent/>}              
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            {this.state.Inroom ?
                                <PanelGroup style={{ background: '#fff', minHeight: '100%' }}>
                                    <Editor run={this.run} codeFromFile={this.state.codeFromFile} users={this.state.users} setUsers={this.setUsers} currentlyTyping={this.state.currentlyTyping} setCurrentlyTyping={this.setCurrentlyTyping}/>
                                    {this.state.result ? <RightSection result={this.state.result}/> : <div />}
                                </PanelGroup>
                                :
                                <div className='croom'>
                                      <Empty 
                                        description={
                                            <span>
                                                no workspace :(
                                            </span>
                                        }
                                        style={{marginBottom: '10px'}}
                                    >
                                    </Empty>
                                    <div>
                                        <Button type='primary' onClick={() => this.createRoomVisible(true)}>Create Room</Button> 
                                        {" "} / {" "}
                                        <Button type='primary' onClick={() => this.joinRoomVisible(true)}>Join Room</Button>
                                    </div>
                                </div>
                            }
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            akin develops ©2019 Created by Akin Shonibare
                        </Footer>
                    </Layout>
                </Layout>
                <Widget handleNewUserMessage={this.handleNewUserMessage} title='chat room' subtitle=''/>
                <CreateRoom modalVisible={this.state.createroommodal} setModalVisible={this.createRoomVisible} setInRoom={this.setInRoom} setCodeFromFile={this.setCodeFromFile}/>                
                <JoinRoom modalVisible={this.state.joinroommodal} setModalVisible={this.joinRoomVisible} setInRoom={this.setInRoom}/>
            </div>
            )
        }
    }
}
//screencast, video, message, audio

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
)(Dashboard);