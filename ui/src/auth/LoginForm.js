import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

export default withAuth(
    class LoginForm extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                sessionToken: null,
                error: null,
                username: '',
                password: ''
            };
            // OktaAuth object being created in the constructor 
            // that gets a property base url which is the issuer url in config.js
            this.OktaAuth = new OktaAuth({ url: props.baseUrl });

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleUsernameChange = this.handleUsernameChange.bind(this);
            this.handlePasswordChange = this.handlePasswordChange.bind(this);
        }

        handleSubmit(event){
            event.preventDefault();
            this.OktaAuth
            .signIn({
                username: this.state.username,
                password: this.state.password
            })
            .then(res => {
                console.log('in then')
                this.setState({
                sessionToken : res.sessionToken
            })})
            .catch(error => {
                let errorMessage = error.errorCauses[0].errorSummary || error.errorSummary;
                this.setState({error: errorMessage});
                console.log(error.statusCode + 'error', error);
            });
        }

        handleUsernameChange(event){
            this.setState ({username: event.target.value});
        }

        handlePasswordChange(event){
            this.setState({ password: event.target.value });
        }
        
        render () {
            if(this.state.sessionToken){
                this.props.auth.redirect({ sessionToken: this.state.sessionToken })
                return null;
            }
            console.log('errMessage>>', this.state.error);
            const errMessage = this.state.error ? (
            <span className = "Error-message">{this.state.error}</span>
            ) : null;

            return(
                
                <form onSubmit = {this.handleSubmit}>
                    <p> Login </p>
                    <div className="Form-element"> {errMessage} </div> 
                    <div className="Form-element">
                        <label className="Label-element">Username:</label>
                        <input 
                        id="username"
                        type= "text"
                        value= {this.state.username}
                        onChange= {this.handleUsernameChange} 
                        />
                    </div>

                    <div className="Form-element">
                        <label className= "Label-element">Password:</label>
                        <input
                        id="password"
                        type="password"
                        value= {this.state.password}
                        onChange= {this.handlePasswordChange}
                        />
                    </div>
                    <input id="submit" type="submit" value="Submit"/>
                </form> 
            );
        }
    }

);