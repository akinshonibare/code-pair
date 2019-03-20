import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Switch, Route } from "react-router-dom";
import { firebaseAuth, GITHUB_AUTH_PROVIDER } from "./utils/firebase";
import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import { setUserData } from './actions/infoAction';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          authLoading: true
        }
    }

    componentDidMount() {
      this.authObserver = firebaseAuth.onAuthStateChanged(user => {
        if(user){
          let visitor = {};
          visitor['name'] = user.providerData[0]['displayName'];
          visitor['email'] = user.providerData[0]['email'];
          visitor['id'] = user.providerData[0]['uid'];
          visitor['photo'] = user.providerData[0]['photoURL'];
          this.props.setUserData(visitor)
        }

          user
            ? this.props.history.push('/')
            : this.props.history.push('/login');
          this.setState({ authLoading: false });
        });
    }

    onLoginClick = async () => {
      this.setState({ authLoading: true });
      try {
        await firebaseAuth.signInWithPopup(GITHUB_AUTH_PROVIDER);
      } catch (e) {
        console.error(e.message || "error authenticating user.");
        this.setState({ authLoading: false });
      }
    };


    onLogoutClick = async () => {
      try {
          await firebaseAuth.signOut();
      } catch (e) {
          console.error(e.message || "error signing user out.");
      }
    };
    
    componentWillUnmount() {
      this.authObserver();
    }

    render(){
        const { authLoading } = this.state;

        return(
          <Switch>
            <Route
              exact path="/"
              render={(props) => <Dashboard onLogoutClick={this.onLogoutClick} {...props}/>}
            />
            <Route
              exact path="/login"
              render={(props) => <LandingPage loading={authLoading} onLoginClick={this.onLoginClick} {...props}/>}
            />
          </Switch>
        );
    }
}

function mapStateToProps(state) {
	return {
        userData: state.pageData,
        teamData: state.pageData
	};
}

const actions = {
	setUserData
};

export default withRouter(connect(
	mapStateToProps,
	actions
)(App));