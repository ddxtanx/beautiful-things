import React from 'react';
import Loader from 'halogen/RingLoader';
import './style.css'
class Loading extends React.Component{
    render() {
        return (<div id="loading">
                    <div id="load">
                        <Loader color="#4DAF7C"></Loader>
                    </div>
                </div>)
    }
}

export default Loading;