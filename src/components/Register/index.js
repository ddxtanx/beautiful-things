import React from 'react';
import axios from 'axios';
import Presenter from './Presenter';
import $ from 'jquery';
import 'jquery-modal';
import Loading from '../Loading';
import autoBind from 'react-autobind';
$.modal.defaults = {
  escapeClose: false,      // Allows the user to close the modal by pressing `ESC`
  clickClose: false,       // Allows the user to close the modal by clicking the overlay
  closeText: null,     // Text content for the close <a> tag.
  showClose: false
}
class Register extends React.Component {
    constructor(){
        super();
        this.state = {email: "", name:"", pass1:"", pass2:"", type:"", text:""};
        autoBind(this);
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
        $("#loading").modal();
        this.setState({type: "", text:""});
        axios.post("register",{
            email: this.state.email,
            name: this.state.name,
            pass: this.state.pass1
        }).then(function(response){
            $.modal.close();
           self.setState(Object.assign({}, response.data, {email: "", name: "", pass1: "", pass2: ""})); 
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
        return (<div>
                    <div id="loading" style={{display: "none"}}>
                        <Loading/>
                    </div>
                    <Presenter type={this.state.type} text={this.state.text} email={this.state.email} name={this.state.name} pass1={this.state.pass1} pass2={this.state.pass2} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} handleSubmit={this.handleSubmit}/>
                </div>)
    }
}
export default Register;