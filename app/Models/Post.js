var mongoose = require('mongoose');
var user = process.env.USER;
var password = process.env.PASSWORD;
var mongoUri = `mongodb://${user}:${password}@ds143131.mlab.com:43131/beautiful-things`;
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Database error: "));
var schema = mongoose.Schema;
var postSchema = new schema({
    title: String,
    text: String,
    userWhoAdded: String,
    userIdWhoAdded: Number,
    postId: Number,
    likes: [String],
    image: String
}, {timestamps: true});
var Post = mongoose.model('Post', postSchema);
module.exports = Post;