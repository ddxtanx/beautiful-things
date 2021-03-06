import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class LoginPresenter extends React.Component{
    render(){
        var alertType = `alert ${this.props.type}`;
        return (
            <div id="main-content">
                <div className={alertType}>
                    {this.props.text}
                </div>
                <div id="logForm">
                    <p id="logTitle">Login Here</p>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={this.props.email} placeholder="Email Here:" onChange={this.props.handleChange} onKeyPress={this.props.handleKeyPress}/>
                    <br/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={this.props.password} placeholder="Password:" onChange={this.props.handleChange} onKeyPress={this.props.handleKeyPress}/>
                    <br/>
                    <input type="submit" className="btn btn-success" name="submit" onClick={this.props.handleSubmit}/>
                </div>
            </div>
        );
    }
}
LoginPresenter.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default LoginPresenter;