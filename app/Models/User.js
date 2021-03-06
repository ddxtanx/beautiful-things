var mongoose = require('mongoose');
var user = process.env.USER;
var password = process.env.PASSWORD;
var mongoUri = `mongodb://${user}:${password}@ds143131.mlab.com:43131/beautiful-things`;
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Database error: "));
var schema = mongoose.Schema;
var userSchema = new schema({
    username: String,
    email: String,
    password: String,
    id: Number
});
var User = mongoose.model('User', userSchema);
module.exports = User;