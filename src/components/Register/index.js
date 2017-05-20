import React from 'react';
import axios from 'axios';
import './style.css';

class Register extends React.Component {
    state = {email: "", name:"", pass1:"", pass2:"", type:"", text:""};
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
        axios.post("/register",{
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
        var alertType = "alert "+this.state.type;
        return (
            <div id="main-content">
                <div className={alertType}>
                    {this.state.text}
                </div>
                <div id="regForm">
                    <p id="regTitle"> Register Here: </p>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" placeholder="Email Here:" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
                    <br/>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" placeholder="Name Here:" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
                    <br/>
                    <label htmlFor="pass1">Password:</label>
                    <input type="password" name="pass1" placeholder="Password Here:" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
                    <br/>
                    <label htmlFor="pass2">Password Again:</label>
                    <input type="password" name="pass2" placeholder="Password Again:" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
                    <br/>
                    <input type="button" name="submit" value="Submit!" className="btn btn-success" id="regBtn" onClick={this.handleSubmit.bind(this)}/>
                </div>
            </div>
            );
    }
}
export default Register;