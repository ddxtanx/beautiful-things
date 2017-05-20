const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const users = require('../app/users.js');
const app = express();
const sessions = require("../app/sessions.js");
// Serve static assets
app.use(express.static('./build'), bodyParser());
// Always return the main index.html, so react-router render the route in the client
app.get("/logout", function(req, res){
    console.log("in logout call");
    sessions.destroy(req, res);
});
app.get('*', function(req, res){
    console.log("sending file");
  res.sendFile(path.resolve('./build/index.html'));
});
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
module.exports = app;