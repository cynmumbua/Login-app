import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { withAuth } from '@okta/okta-react';

// enclosed in withAuth inorder to get access to the isAuthenticated function
export default withAuth (class Login extends Component{
    constructor(props){
        super(props);
        this.state = {authenticated: null};
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
      }
   
    /* checkAuthentication is executed here to ensure that when
    the component is created it is checked and every subsequent
    change to the component checks again */

    componentDidUpdate(){
        this.checkAuthentication();
    }

    render(){
        console.log('login', this.state.authenticated)
        if(this.state.authenticated === null) return null;
        return this.state.authenticated ?
        <Redirect to={{ pathname: '/profile'}} />:
        <LoginForm baseUrl = {this.props.baseUrl} />;
    }
});