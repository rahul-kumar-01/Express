const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./userSchema');
const Post = require('./postSchema')

const commentSchema = new Schema({
    commentContent: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    postId: {
        type: Schema.Types.ObjectId, 
        ref: 'Post' 
    },
},
{ 
    timestamps: true 
});


const Comment = mongoose.model('Comment', commentSchema);

Comment.createCollection().then(function(collection) {
    console.log('Comment Collection is created!');
});
module.exports = Comment;
