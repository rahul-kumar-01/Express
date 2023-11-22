const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./userSchema');

const postSchema = new Schema({
    postContent: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    commentArray:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ] 
},
{ 
    timestamps: true 
});


const Post = mongoose.model('Post', postSchema);

Post.createCollection().then(function(collection) {
    console.log('Post Collection is created!');
});
module.exports = Post;
