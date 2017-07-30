const User = require('./Models/User');
function register(req, res){
    res.writeHead(200, {'Content-Type': 'text/json'});
    console.log("in register");
    var email = req.body.email;
    var username = req.body.name;
    var pass = req.body.pass;
    console.log([email,username,pass]);
    User.find({
        email: email
    }, function(err, users){
        if(err) throw err;
        console.log("users found");
        if(users.length!==0){
            console.log("Other user found");
            res.write(JSON.stringify({
                error: 'none',
                type: 'alert-danger',
                text: 'A user with that email is already registered'
            }));
            res.end();
            return;
        } else{
            console.log("Creating user");
            var userData = {
                email: email,
                username: username,
                password: pass,
                id: Math.round(Math.random() * Math.pow(10, 17))
            };
            console.log(userData);
            var user = new User(userData);
            user.save(function(err){
                if(err) throw err;
                userData.type = "alert-success";
                userData.text = "Registration complete! Now log in!";
                res.write(JSON.stringify(userData));
                res.end();
                return;
            });
        }
    });
}
function login(req, res){
    res.writeHead(200, {'Content-Type': 'text/json'});
    var email = req.body.email;
    var pass = req.body.password;
    User.find({
        email: email,
        password: pass
    }, function(err, users){
        if(err) throw err;
        var resData;
        if(users.length==0){
            resData = {
                success: false,
                alertData:{
                    type: "alert-danger",
                    text: "Email&Password combination not found"
                }
            }
            res.write(JSON.stringify(resData));
            res.end();
        } else{
            var user = users[0];
            resData = {
                success: true,
                loginData:{
                    name: user.username,
                    email: user.email,
                    id: user.id
                },
                alertData:{
                    type: "alert-success",
                    text: "Successfully logged in!"
                }
            };
            res.write(JSON.stringify(resData));
            res.end();
        }
    });
}
module.exports = {
    register: register,
    login: login
};