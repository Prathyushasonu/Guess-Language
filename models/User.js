
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    maxScore: {
        type: Number,
        default: 0,
    },
}, {
    timestamps:true
});


userSchema.pre("save", function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = bcrypt.hashSync(this.password, 12);
    next();
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema );
module.exports = User;