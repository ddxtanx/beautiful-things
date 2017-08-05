import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import './style.css';
import $ from 'jquery';
import autoBind from 'react-autobind';

class AddPost extends React.Component{
    constructor(props){
        super(props);
        autoBind(this);
    }
    showForm(){
        $("#addPost").show("fast");
    }
    hideForm(){
        $("#addPost").hide("fast");
    }
    render(){
        return (<div>
            <form id="addPost" style={{"display": "none"}}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={this.props.title} onChange={this.props.handleChange}/>
                <br/>
                <textarea id="text" value={this.props.text} onChange={this.props.handleChange}/>
                <br/>
                <input type="file" id="file" value={this.props.file} onChange={this.props.handleChange}/>
                <br/>
                <img className="image" id="preview" src={URL.createObjectURL(new Blob((this.props.file)?[this.props.file]:[], {type: (this.props.file)?this.props.file.mimetype:''}))} alt="Your Image"/>
                <br/>
                <Button type="button" bsStyle="success" onClick={this.props.handleSubmit}>Submit</Button>
                <Button type="button" bsStyle="warning" onClick={this.hideForm}>Cancel</Button>
            </form>
            <Button type="button" bsStyle="info" onClick={this.showForm}>Add Post</Button>
        </div>);
    }
}
AddPost.propTypes = {
    title: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
}
export default AddPost;