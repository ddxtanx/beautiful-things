var Post = require('./Models/Post');
var sessions = require("./sessions.js");
function getPosts(req, res){
    Post.find({}, null, {
        sort:{
            createdAt: -1
        }
    }, function(err, posts){
        if(err) throw err;
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(posts));
    });
}

function addPost(req, res){
    var title = req.body.title;
    var text = req.body.text;
    var id = req.body.id;
    var userName = sessions.getSessionData(id).loginData.name;
    var loginId = sessions.getSessionData(id).loginData.id;
    var postId = Math.round(Math.random() * Math.pow(10, 17))
    Post.create({
        title,
        text,
        userIdWhoAdded: loginId,
        userWhoAdded: userName,
        postId,
        likes: []
    }, function(err){
        if(err) throw err;
        res.writeHead(200, {"Content-Type": "text/json"});
        res.end(JSON.stringify({userId: loginId, name: userName, postId}));
    });
}

function deletePost(req, res){
    res.writeHead(200, {"Content-Type": "text/json"});
    let userId = req.body.userId;
    let loginId = sessions.getSessionData(userId).loginData.id;
    let postUserId = req.body.postUserId;
    console.log(loginId);
    console.log(postUserId);
    if(loginId === postUserId){
        console.log("removing");
        Post.remove({
            postId: req.body.postId
        }, function(err, resp){
            if(err) throw err;
            res.end(JSON.stringify({success:true}));
        });
    } else{
        console.log(`falst attempt to remove by ${loginId}`);
        res.end(JSON.stringify({success: false}));
    }
}

function likePost(req, res){
    res.writeHead(200, {"Content-Type": "text/json"});
    let sessionId = req.body.userId;
    let userId = sessions.getSessionData(sessionId).loginData.id;
    let postId = req.body.postId;
    Post.findOne({
        postId
    }, function(err, post){
        if(err) throw err;
        let likes = post.likes;
        likes = likes.filter((like) => parseInt(like)===userId);
        if(likes.length>0){
            Post.update({
                postId
            }, {
                $pull: {
                    likes: userId
                }
            }, function(err, resp){
                if(err) throw err;
                res.end(JSON.stringify({liked: false, userId}));
            })
        } else{
            Post.update({
                postId
            }, {
                $push:{
                    likes: userId
                }
            }, function(err, resp){
                if(err) throw err;
                res.end(JSON.stringify({liked: true, userId}));
            })
        }
    })
}
module.exports = {
    getPosts,
    addPost,
    deletePost,
    likePost
}