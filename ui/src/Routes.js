import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { Redirect } from "react-router-dom";

export default withAuth(
    class Routes extends React.Component{
        constructor(props){
            super(props);
            this.state = { authenticated: null};
            this.checkAuthentication = this.checkAuthentication.bind(this);
            this.checkAuthentication();
        }

        async checkAuthentication(){
            const authenticated = await this.props.auth.isAuthenticated();
            if(authenticated !== this.state.authenticated){
                this.setState({ authenticated });
            }
        }

        componentDidUpdate(){
            this.checkAuthentication();
        }

        render(){
          if(this.state.authenticated === null) return null;

          const authRoute = this.state.authenticated ? (
            <div className="Nav-link">
                <Link to="/"> Home</Link>
                <a href="" onClick ={() => this.props.auth.logout()} className="Nav-link-logout">     
                  Logout
                </a>
                <Link to="/profile">Profile</Link>
                <Redirect to={'/profile'} />
            </div> 
          ) : (
            <div className="Nav-link">
              <Link to="/"> Home</Link>
              <a href="" onClick={() => {this.props.auth.login()}} className="Nav-link-login">
               Login
              </a>
              <Link to="/register">Register</Link>
            </div>
       );
       
        return (
          <nav>
            {authRoute}
          </nav>
        )
    }
        
});