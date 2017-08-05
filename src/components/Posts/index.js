import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Presenter from './Presenter';
import axios from 'axios';
import autoBind from 'react-autobind';
import $ from 'jquery';
import Loading from '../Loading';
function testMime(file){
    var match = file.type.match(/image\/(gif|png|jpg|jpeg)/);
    if(match!==null){
        return match[0]===file.type;
    } else{
        return false;
    }
}
class PostsContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            posts:[],
            resType:"", 
            resText:"", 
            title: "", 
            text: "",
            file: ""
        };
        autoBind(this);
    }
    getPosts(){
        var self = this;
        $("#loading").show();
        axios.post("getPosts").then(function(data){
            $("#loading").hide();
            self.setState({posts: data.data});
        }).catch(function(err){
            if(err) throw err;
        });
    }
    componentWillMount(){
        this.getPosts();
    }
    handleChange(e){
        var changeObj = {};
        if(e.target.id === "file"){
            changeObj = {
                file: e.target.files[0]
            };
        } else{
            changeObj[e.target.id] = e.target.value;
        }
        this.setState(changeObj);
    }
    handleSubmit(){
        var self = this;
        if(this.state.title!==""&&this.state.text!==""&&this.state.file!==""&&testMime(this.state.file)){
            var data;
            var opts;
            data = new FormData();
            data.append("title", this.state.title);
            data.append("text", this.state.text);
            data.append("id", this.props.cookies.get('id'));
            data.append("file", this.state.file);
            opts = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
            $("#loading").show();
            this.setState({resType:"", resText:""});
            axios.post("addPost",data,opts).then(function(data){
                $("#loading").hide();
                var posts = self.state.posts;
                var post = {
                    title: self.state.title,
                    text: self.state.text,
                    userIdWhoAdded: data.data.userId,
                    userWhoAdded: data.data.name,
                    postId: data.data.postId,
                    likes: [],
                    image: data.data.image
                }
                posts.unshift(post);
                self.setState({resType:"success", resText:"Post successfully added!", posts: posts, title:"", text: "", file:[]});
                $("#addPost").hide('fast');
            }).catch(function(err){
                if(err) throw err;
            });
        } else{
            self.setState({resType: "danger", resText:"Title nor text nor file cannot be blank & file must be and image"});
        }
    }
    handleDelete(postUserId, postId){
        let self = this;
        $("#loading").show();
        axios.post("deletePost",{
            postId,
            postUserId,
            userId: self.props.cookies.get('id')
        }).then(function(data){
            $("#loading").hide();
            if(data.data.success){
                let posts = self.state.posts;
                posts = posts.filter(function(post){
                    return post.postId!==postId
                });
                self.setState({posts});
                self.setState({resType: "success", resText:"Successfully deleted!"});
            } else {
                self.setState({resType: "danger", resText: "You are not allowed to delete that post."});
            }
        })
    }
    /**
     * Updates a post in the posts array with a given postId
     * @param {String} postId 
     * @param {Object(Post)} post 
     * @return {Array[Post]} updated posts array
     */
    updatePosts(postId, post){
        let posts = this.state.posts;
        return posts.map(function(originalPost){
            if(originalPost.postId === postId){
                return post;
            } else{
                return originalPost;
            }
        });
    }
    handleLike(postId){
        let self = this;
        let posts = this.state.posts;
        let post = posts.filter((post) => post.postId === postId)[0];
        $("#loading").show();
        axios.post("likePost", {
            postId,
            userId: self.props.cookies.get('id')
        }).then(function(data){
            $("#loading").hide();
            if(data.data.liked){
                post.likes.push(data.data.userId.toString());
                self.setState({posts: self.updatePosts(postId, post)});
            } else{
                post.likes = post.likes.filter(function(like){
                    return !(like === data.data.userId.toString());
                });
                self.setState({posts: self.updatePosts(postId, post)});
            }
        })
    }
    /**
     * Determines if the user has liked the photo
     * @param {Array[String]} post
     * @return {Boolean} wether or not the user has liked the post 
     */
    findLike(post){
        if(post.likes.filter((like) => like === this.props.loginData.id.toString()).length>0){
            return true
        } else{
            return false;
        }
    }
    render(){
        return (<div>
                    <Loading id="loading" style={{display: "none"}}/>
                    <Presenter posts={this.state.posts} title={this.state.title} file={this.state.file} text={this.state.text} file={this.state.file} resType={this.state.resType} resText={this.state.resText} cookies={this.props.cookies} loginData={this.props.loginData} handleChange={this.handleChange} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} handleLike={this.handleLike} findLike={this.findLike}/>
                </div>);
    }
}
PostsContainer.propTypes = {
    cookies: PropTypes.object.isRequired,
    loginData: PropTypes.object.isRequired
}
export default PostsContainer;