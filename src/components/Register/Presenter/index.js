import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class RegisterPresenter extends React.Component{
    render(){
        var alertType = "alert "+this.props.type;
        return (
            <div id="main-content">
                <div className={alertType}>
                    {this.props.text}
                </div>
                <div id="regForm">
                    <p id="regTitle"> Register Here: </p>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={this.props.email} placeholder="Email Here:" onChange={this.props.handleChange} onKeyPress={this.props.handleKeyPress}/>
                    <br/>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={this.props.name} placeholder="Name Here:" onChange={this.props.handleChange} onKeyPress={this.props.handleKeyPress}/>
                    <br/>
                    <label htmlFor="pass1">Password:</label>
                    <input type="password" name="pass1" value={this.props.pass1} placeholder="Password Here:" onChange={this.props.handleChange} onKeyPress={this.props.handleKeyPress}/>
                    <br/>
                    <label htmlFor="pass2">Password Again:</label>
                    <input type="password" name="pass2" value={this.props.pass2} placeholder="Password Again:" onChange={this.props.handleChange} onKeyPress={this.props.handleKeyPress}/>
                    <br/>
                    <input type="button" name="submit" value="Submit!" className="btn btn-success" id="regBtn" onClick={this.props.handleSubmit}/>
                </div>
            </div>
            );
    }
}
RegisterPresenter.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    pass1: PropTypes.string.isRequired,
    pass2: PropTypes.string.isRequired
}
export default RegisterPresenter;