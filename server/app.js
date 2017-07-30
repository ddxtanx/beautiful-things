const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('../app/users.js');
const app = express();
const sessions = require("../app/sessions.js");
const posts = require("../app/posts.js");
// Serve static assets
app.use(express.static('./public'), bodyParser());
// Always return the main index.html, so react-router render the route in the client
app.get("/logout", function(req, res){
    console.log("in logout call");
    sessions.destroy(req, res);
});
app.get("/dist/bundle.js", function(req, res){
    res.sendFile(path.resolve(__dirname, "../public/dist/bundle/js"));
});
app.get("/*", function(req, res){
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
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