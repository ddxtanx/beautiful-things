import React from 'react';
import './style.css'
class Loading extends React.Component{
    render() {
        return (<div>
                    <h1> Loading </h1>
                    <script>alert("Loading");</script>
                </div>)
    }
}

export default Loading;