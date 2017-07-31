import React, {Component} from 'react';
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
        var alertClass = `alert alert-${this.props.type}`;
        for(var x = 0; x<posts.length; x++){
            var post = posts[x];
            var postElement = (<Post className="post" key={post.postId} loginData={this.props.loginData} handleLike={this.props.handleLike} handleDelete={this.props.handleDelete} findLike={this.props.findLike} post={post}/>);
            htmlPosts.push(postElement);
        }
        return (<div>
                    <div className={alertClass}>
                        {this.props.text}
                    </div>
                    <AddPost cookies={this.props.cookies} loginData={this.props.loginData} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}/>
                    <div id="posts">
                        {htmlPosts}
                    </div>
                </div>)
    }
}

export default PostsPresent;