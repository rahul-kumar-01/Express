const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    userPassword:{
        type:String,
        required: true
    },
    userEmailId:{
        type:String,
        required: true
    },
},
{ 
    timestamps: true 
});


const User = mongoose.model('User', userSchema);
User.createCollection().then(function(collection) {
    console.log('User Collection is created!');
});
module.exports = User;
