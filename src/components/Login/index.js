import React from 'react';
import axios from 'axios';
import './style.css';
import Session from '../Session';
class Login extends React.Component {
    state = {email:"", password:"", type:"", text:""}
    handleChange(e){
        var stateData = {};
        stateData[e.target.name]=e.target.value;
        this.setState(stateData);
    }
    handleKeyPress(e){
        if(e.which=='13'||e.keyCode=='13'){
            this.handleSubmit();
        }
    }
    handleSubmit(){
        var self = this;
        axios.post("/login", {
            email: this.state.email,
            password: this.state.password
        }).then(function(response){
            if(response.data.success){
                console.log(response.data.loginData);
                Session.setSession(self.props.cookies.get('id'), {loggedin: true, loginData: response.data.loginData} , function(){
                    self.props.updateSession();
                });
            }
            self.setState(response.data.alertData);
        }).catch(function(err){
            throw err;
        });
    }
    render(){
        var alertType = `alert ${this.state.type}`;
        return (
            <div id="main-content">
                <div className={alertType}>
                    {this.state.text}
                </div>
                <div id="logForm">
                    <p id="logTitle">Login Here</p>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Email Here:" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
                    <br/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" placeholder="Password:" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
                    <br/>
                    <input type="submit" className="btn btn-success" name="submit" onClick={this.handleSubmit.bind(this)}/>
                </div>
            </div>
            );
    }
}
export default Login;