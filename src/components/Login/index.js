import React from 'react';
import axios from 'axios';
import Session from '../../Session';
import Presenter from './Presenter';
import Loading from '../Loading';
import autoBind from 'react-autobind';
import $ from 'jquery';
import 'jquery-modal';
let alertData = {type: "", text: ""};
class Login extends React.Component {
    constructor(){
        super();
        this.state = {email:"", password:"", type:alertData.type, text:alertData.text};
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
        $("#loading").modal()
        axios.post("/login", {
            email: this.state.email,
            password: this.state.password
        }).then(function(response){
            $.modal.close();
            if(response.data.success){
                Session.setSession(self.props.cookies.get('id'), {loggedin: true, loginData: response.data.loginData} , function(){
                    self.props.updateSession(response.data.loginData);
                });
            }
            alertData = response.data.alertData;
            self.setState(alertData);
        }).catch(function(err){
            throw err;
        });
        this.setState({email: "", password: ""})
    }
    render(){
        return (<div>
                    <div id="loading" style={{display: 'none'}}>
                        <Loading/>
                    </div>
                    <Presenter email={this.state.email} password={this.state.password} type={this.state.type} text={this.state.text} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} handleSubmit={this.handleSubmit}/>
                </div>
        );
    
    }
}
export default Login;