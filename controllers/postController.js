const User = require('../models/userSchema');
const Post = require('../models/postSchema');
const Comment = require('../models/commentSchema');

const createPost = async (req,res) => {
    let user = await User.findById(req.cookies.userId);
    const post = await Post.create({ postContent: req.body.postContent , userId: user._id});
    return res.redirect('/');
}

const deletePost = async (req,res) => {
    let postid = req.query.postId;
    let userid = req.query.userId;
    const post = await Post.findById(postid).populate('userId');
    let temp =  post.userId._id.toString();
    for(let i = 0; i < post.commentArray.length ; ++i){
        await Comment.deleteOne({ _id : post.commentArray[i]._id});
    }
    post.commentArray.length = 0;
    post.save();
    if(temp === userid){
        await Post.deleteOne({ _id: post._id }); 
    }
    return res.redirect('back');
}

module.exports = {
    deletePost,
    createPost
}