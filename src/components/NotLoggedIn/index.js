import React from 'react';
import './style.css';

class Err extends React.Component{
    render(){
        return <h1> You must be logged in to visit this page. Go <span><a href="/login">Here</a></span> to login.</h1>
    }
}
export default Err;