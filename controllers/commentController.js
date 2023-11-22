const User = require('../models/userSchema');
const Post = require('../models/postSchema');
const Comment = require('../models/commentSchema');
const { query } = require('express');

const createComment = async (req, res) => {
    const comment = new Comment({
        commentContent: req.body.commentContent,
        userId: req.query.userId,
        postId: req.query.postId,
      });
      await comment.save();
      const post = await Post.findById(req.query.postId).exec();
      post.commentArray.push(comment._id);
      await post.save();
      return res.redirect('back');
  };
  

const deleteComment = async(req,res) => {
  await Comment.deleteOne({ _id: req.query.commentId}); 
  return res.redirect('back');
}



module.exports = {
    createComment,
    deleteComment
}