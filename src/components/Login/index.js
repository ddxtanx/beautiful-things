import React from 'react';
import axios from 'axios';
import Session from '../../Session';
import Presenter from './Presenter';
import autoBind from 'react-autobind';
class Login extends React.Component {
    constructor(){
        super();
        this.state = {email:"", password:"", type:"", text:""};
        autoBind(this);
    }
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
                console.log(response.data);
                Session.setSession(self.props.cookies.get('id'), {loggedin: true, loginData: response.data.loginData} , function(){
                    self.props.updateSession(response.data.alertData);
                });
            }
            self.setState(response.data.alertData);
        }).catch(function(err){
            throw err;
        });
    }
    render(){
        return <Presenter type={this.state.type} text={this.state.text} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} handleSubmit={this.handleSubmit}/>;
    }
}
export default Login;