const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('../app/users.js');
const app = express();
const sessions = require("../app/sessions.js");
const posts = require("../app/posts.js");
const compression = require('compression');
const multer = require("multer");
const upload = multer({
    dest: './public/img/'
});
const fs = require("fs");
// Serve static assets
app.use(compression(), express.static(path.resolve(__dirname,'../public')), bodyParser.json(), bodyParser.urlencoded({
    extended:true
}));
app.get("/logout", function(req, res){
    console.log("in logout call");
    sessions.destroy(req, res);
});
app.get("/:filename.js", function(req, res){
    res.set("Content-Type", "text/javascript");
    var filename = req.params.filename;
    res.sendFile(path.resolve(__dirname, "../public/dist/"+filename+".js"));
})
app.get("/*", function(req, res){
    var filename = "../public/index.html"
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
app.post("/addPost", upload.single('file'), function(req, res){
    console.log("in addPost call");
    console.log(req.body);
    console.log(req.file)
    posts.addPost(req, res);
});
app.post("/deletePost", function(req, res){
    console.log("in delPost call");
    posts.deletePost(req, res)
});
app.post("/likePost", function(req, res){
    console.log("in likePost call");
    posts.likePost(req, res);
});
app.post("/image", function(req, res){
    fs.readFile('./public/img/'+req.body.name, (err, file) => {
        if(err){
            console.log(err);
            fs.readFile("./public/img/errorstop.png", (err, file) => {
                if(err) throw err;
                res.end(JSON.stringify({file: file.toString('base64'), success:true}));
            })
        }
        res.end(JSON.stringify({file: file.toString('base64'), success:true}));
    })
})
module.exports = app;