import React from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import './style.css';

class NavBar extends React.Component{
    renderTabs(){
        if(this.props.loggedin){
            return this.renderLoggedIn();
        } else{
            return this.renderNotLoggedIn();
        }
    }
    renderLoggedIn(){
        var idString = "/logout?id="+this.props.cookies.get('id');
        return (<Nav bsStyle="tabs">
                    <NavItem href="/">Home</NavItem>
                    <NavItem>
                        Welcome, {this.props.loginData.name}
                    </NavItem>
                    <NavItem href="/posts">Posts</NavItem>
                    <NavItem href="/settings"><span></span></NavItem>
                    <NavItem href={idString}>Logout</NavItem>
                </Nav>);
    }
    renderNotLoggedIn(){
        return(<Nav bsStyle="tabs">
                    <NavItem href="/">Home</NavItem>
                    <NavItem href="/register">Register</NavItem>
                    <NavItem href="/login">Login</NavItem>
                </Nav>);
    }
    render(){
        return (<Navbar>
                    {this.renderTabs()}
                </Navbar>
            );
    }
}
export default NavBar;