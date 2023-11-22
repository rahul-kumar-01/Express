const User = require('../models/userSchema');
const mongoose = require('mongoose');
const Post = require('../models/postSchema');

const home = async (req,res) => {
    const userId = req.cookies.userId;
    const user = await User.findById(userId);
    const postArray = await Post.find({})
    .sort('-createdAt')
    .populate('userId')
    .populate({
        path: 'commentArray',
        populate: {
            path: 'userId'
        }
    })
    . exec();
    if(userId === undefined) return res.render('home',{user:user,postArray:postArray});
    try{
        const isValidObjectId = mongoose.Types.ObjectId.isValid(userId); //CastError: Cast to ObjectId failed for value "655828e712b3320d9530a0" (type string) at path "_id" for model "User"
        if(isValidObjectId) {
            const user = await User.findById(userId).exec();
            if(user === null) return res.redirect('/user/signIn');
            return res.render('home',{user:user,postArray: postArray});
        }else{
            return res.status(500).send('Cast Error');
        }
    }
    catch(error){
        console.error('Error querying user:', error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    home
}