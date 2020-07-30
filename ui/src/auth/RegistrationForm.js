import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import config from '../config';

export default withAuth (class RegistrationForm extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                sessionToken: null,
                error: null
            };

            this.oktaAuth = new OktaAuth({ url: config.url });
            this.checkAuthentication = this.checkAuthentication.bind(this);
            this.checkAuthentication();

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
            this.handleLastNameChange = this.handleLastNameChange.bind(this);
            this.handleEmailChange = this.handleEmailChange.bind(this);
            this.handlePassswordChange = this.handlePassswordChange.bind(this);
        }

        async checkAuthentication(){
            const sessionToken = await this.props.auth.getIdToken();
            if(sessionToken){
                this.setState({ sessionToken });
            }
        }
        
        componentDidUpdate(){
            this.checkAuthentication();
        }

        handleFirstNameChange(event){
            this.setState({ firstName: event.target.value});
        }
        handleLastNameChange(event){
            this.setState({ lastName: event.target.value});
        }
        handleEmailChange(event){
            this.setState({ email: event.target.value});
        }
        handlePassswordChange(event){
            this.setState({ password: event.target.value});
        }
        handleSubmit(event){
            event.preventDefault();

            fetch('/api/v1/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
            .then(user =>{
                this.oktaAuth
                .signIn({
                    username: this.state.email,
                    password: this.state.password
                })
                .then(res => {
                    this.setState({
                        sessionToken: res.sessionToken 
                    })
                })
                .catch(error =>{
                    let errorMessage =  error.errorCauses[0].errorSummary ;
                    this.setState({error: errorMessage});
                    console.log(error.statusCode + 'error', error);
                })
            })
            .catch(error =>{
                this.setState({error: error.message});
                console.log(error.statusCode + 'error', error);
            })
        }
        render(){
            if(this.state.sessionToken){
                this.props.auth.redirect({ sessionToken: this.state.sessionToken})
                this.props.history.push('/profile')
                return null;
            }
            const errMessage = this.state.error ? (
                <span> {this.state.error} </span>
            ): null;
            return (    
                <form onSubmit = {this.handleSubmit}>
                    <p> Register </p>
                    <div className="Error-message"> {errMessage} </div> 
                    <div className = "Form-element">
                        <label className="Label-element">Email:</label>
                        <input
                        type="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                        />
                    </div>
                    <div className = "Form-element">
                        <label className="Label-element">First Name:</label>
                        <input
                        type="text"
                        id="firstName"
                        value={this.state.firstName}
                        onChange={this.handleFirstNameChange}
                        />
                    </div>
                    <div className = "Form-element">
                        <label className="Label-element">Last Name:</label>
                        <input
                        type="text"
                        id="lastName"
                        value={this.state.lastName}
                        onChange={this.handleLastNameChange}
                        />
                    </div>
                    <div className = "Form-element">
                        <label className="Label-element">password:</label>
                        <input
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.handlePassswordChange}
                        />
                    </div>
                    <input type="submit" id="submit" value="Register" />
                </form>                
            );
        }
});