const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('../app/users.js');
const app = express();
const sessions = require("../app/sessions.js");
const posts = require("../app/posts.js");
let packageName = (process.env.build==="production")?"bundle.js.gz":"bundle.js"
// Serve static assets
app.use(express.static('../public'),express.static('../public/dist'), bodyParser());
app.get("/logout", function(req, res){
    console.log("in logout call");
    sessions.destroy(req, res);
});
app.get(`/${packageName}`, function(req, res){
    if(packageName==="bundle.js.gz"){
        res.set("Content-Encoding", "gzip");
    }
    res.set("Content-Type", "text/javascript");
    res.sendFile(path.resolve(__dirname, `../public/dist/${packageName}`));
});
app.get("/*", function(req, res){
    var filename = (process.env.build==="production")?"../public/index.html":"../public/index.test.html"
    res.sendFile(path.resolve(__dirname, filename));
})
app.post("/register", function(req, res){
    console.log("in reg call");
    users.register(req, res);
});
app.post("/login", function(req, res){
    console.log("in login call");
    users.login(req, res);
});
app.post("/sessionGet", function(req, res){
    console.log("in sessionGet call");
    sessions.getSession(req, res);
});
app.post("/sessionSet", function(req, res){
    console.log("in sessionSet call");
    sessions.setSession(req, res);
});
app.post("/getPosts", function(req, res){
    console.log("in postsGet call");
    posts.getPosts(req, res);
});
app.post("/addPost", function(req, res){
    console.log("in addPost call");
    posts.addPost(req, res);
});
app.post("/deletePost", function(req, res){
    console.log("in delPost call");
    posts.deletePost(req, res)
});
app.post("/likePost", function(req, res){
    console.log("in likePost call");
    posts.likePost(req, res);
})
module.exports = app;