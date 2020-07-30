import React, { Component } from 'react';
import './App.css';

/*The ImplicitCallback component handles the callback 
from the authentication flow to ensure there is an endpoint
within the React application to catch the return call from Okta */

import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Routes from './Routes';
import LandingPage from './LandingPage';
import RegistrationForm from './auth/RegistrationForm';
import config from './config';
import LoginPage from './auth/LoginPage';
import ProfilePage from './auth/ProfilePage';


export default class App extends Component{
  render(){
    return(
      <div className="App">
        <Routes/>
        <main>
          <Route path='/' exact component = {LandingPage} />
          <Route path="/login"
          render ={() => <LoginPage baseUrl = {config.url} />}
          />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <Route path="/register" component={RegistrationForm} />
          <SecureRoute path="/profile" component={ProfilePage} />
        </main>
      </div>
    );
  }
}

