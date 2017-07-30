import React from 'react';
import {Button} from 'react-bootstrap';
class Post extends React.Component{
    render(){
		var post = this.props.post;
		var delButton = (this.props.loginData.id==post.userIdWhoAdded)?<Button className="delete" onClick={() => this.props.handleDelete(post.userIdWhoAdded, post.postId)}><span className="fa fa-times"></span></Button>:<div></div>;
		return (<div>
			<h2 className="title">{post.title}</h2>
			<hr/>
			<h4 className="text">{post.text}</h4>
			<Button className="likes" onClick={() => this.props.handleLike(post.postId)}>{post.likes.length}<span className={"fa fa-heart " + (this.props.findLike(post)?'liked':'')}></span></Button>
			{delButton}
		</div>)
    }
}

export default Post;