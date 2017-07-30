import React from 'react';
import {Button} from 'react-bootstrap';
import './style.css';
import $ from 'jquery';
import autoBind from 'react-autobind';

class AddPost extends React.Component{
    constructor(props){
        super(props);
        autoBind(this);
    }
    componentDidMount(){
        this.hideForm();
    }
    showForm(){
        $("#addPost").show("fast");
    }
    hideForm(){
        $("#addPost").hide("fast");
    }
    render(){
        return (<div>
            <div id="addPost">
               <label htmlFor="title">Title:</label>
               <input type="text" id="title" onChange={this.props.handleChange}/>
               <br/>
                <textarea id="text" onChange={this.props.handleChange}/>
                <br/>
                <Button type="button" bsStyle="success" onClick={this.props.handleSubmit}>Submit</Button>
                <Button type="button" bsStyle="warning" onClick={this.hideForm}>Cancel</Button>
            </div>
            <Button type="button" bsStyle="info" onClick={this.showForm}>Add Post</Button>
        </div>);
    }
}

export default AddPost;