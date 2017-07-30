import React from 'react';
import axios from 'axios';
import Presenter from './Presenter';
import autoBind from 'react-autobind';
class Register extends React.Component {
    constructor(){
        super();
        this.state = {email: "", name:"", pass1:"", pass2:"", type:"", text:""};
    }
    handleSubmit(){
        var self = this;
        if(this.state.email.indexOf('@')===-1 || this.state.email.indexOf(".")===-1){
            this.setState({type: "alert-danger", text: "Email must be a valid email"});
            return;
        } else if(this.state.pass1!==this.state.pass2){
            this.setState({type: "alert-danger", text: "Passwords must match"});
            return;
        } else if(this.state.name==="" || this.state.pass1===""){
            this.setState({type: "alert-danger", text: "All fields must be filled out"});
            return;
        }
        this.setState({type: "", text:""});
        axios.post("register",{
            email: this.state.email,
            name: this.state.name,
            pass: this.state.pass1
        }).then(function(response){
           self.setState(response.data); 
        }).catch(function(err){
            throw err;
        });
    }
    handleChange(e){
        var id = e.target.name;
        var stateObj = {};
        stateObj[id]=e.target.value;
        this.setState(stateObj);
    }
    handleKeyPress(e){
        if(e.which=='13'||e.keyCode=='13'){
            this.handleSubmit();
        }
    }
    render(){
        return <Presenter type={this.state.type} text={this.state.text} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} handleSubmit={this.handleSubmit}/>
    }
}
export default Register;