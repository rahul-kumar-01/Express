const User  = require('../models/userSchema');
const signIn = (req,res) =>{
    return res.render('signIn');
}
const signUp = (req,res) => {
    return res.render('signUp');
}
const createUser = async (req,res) => {
    const usersArray = await User.find({userEmailId : req.body.userEmailId }).exec();
    if(usersArray.length > 0) {
        console.log("User Already Exists");
        return res.redirect('back');
    }
    if(req.body.userPassword === req.body.userConfirmPassword){
        await User.create(req.body);
        console.log("Accout Created Successfully");
        return res.redirect('back');
    } 
    res.status(400).send("Password & ConfirmPassword Don't Match.");
    return res.redirect('back');
}


const createSession = async (req,res) => {
    console.log(req.body);
    let usersArray  = await User.find({ userEmailId: req.body.userEmailId , userPassword : req.body.userPassword }).exec();
    if(usersArray.length > 0  && usersArray[0].userEmailId === req.body.userEmailId && usersArray[0].userPassword === req.body.userPassword){
        res.cookie('userId', usersArray[0].id,{maxAge: 6000000});
        return res.redirect('/');
    }
    else{
        return res.redirect('back');
    }    
}

const  profile = async (req,res) => {
    let user = await User.findById(req.cookies.userId);
    let locals = {
        user: user
    }
    res.locals.user = user;
    console.log(res.locals);
    return res.render('profile',{user});
}

const signOut = async (req,res) => {
    console.log(req.cookies);
    res.clearCookie('userId');
    return res.redirect('/user/signIn')
}


module.exports = {
    signIn,
    signUp,
    createUser,
    createSession,
    profile,
    signOut
}
