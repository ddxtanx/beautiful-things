import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddPost from './AddPost';
import Post from './Post';
import './style.css';

class PostsPresent extends Component{
    constructor(props){
        super(props);
        this.render = this.render.bind(this);
    }
    render(){
        var posts = this.props.posts;
        var htmlPosts = [];
        var alertClass = `alert alert-${this.props.resType}`;
        for(var x = 0; x<posts.length; x++){
            var post = posts[x];
            var postElement = (<Post className="post" key={post.postId} loginData={this.props.loginData} handleLike={this.props.handleLike} handleDelete={this.props.handleDelete} findLike={this.props.findLike} post={post}/>);
            htmlPosts.push(postElement);
        }
        return (<div>
                    <div className={alertClass}>
                        {this.props.resText}
                    </div>
                    <AddPost title={this.props.title} text={this.props.text} file={this.props.file} cookies={this.props.cookies} loginData={this.props.loginData} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}/>
                    <div id="posts">
                        {htmlPosts}
                    </div>
                </div>)
    }
}
PostsPresent.propTypes = {
    posts: PropTypes.arrayOf(Object).isRequired,
    resText: PropTypes.string.isRequired,
    resType: PropTypes.string.isRequired,
    loginData: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    findLike: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    cookies: PropTypes.object.isRequired
}
export default PostsPresent;