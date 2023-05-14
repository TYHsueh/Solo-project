const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
const {isEmail} =require('validator');

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "First name is required"]
    },
    lastName:{
        type:String,
        required:[true, 'Last name is required']
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        validate:[isEmail, 'Invalid Email']
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minLength:[8, 'Password must be 8 characters']
    }
}, {timestamps:true})

// * Middleware

//UserSchema must match the UserSchema above
//.virtual contain something only show in reg form but not going to store in the database for user model
//'this' refers to the new class
UserSchema.virtual('confirmPassword')
.get(()=> this.confirmPassword)//.get set the confirmPassword key to useSchema(temporarily)
.set((value)=> this.confirmPassword = value)//.set put the value you just enter through form as the value of confirmPassword key
//in short these 3 lines set the virtual field confirmPassword for later validation

//then run pre() function (pre means before run entered info validattion) to compare if the passwords match 
//means we want to run the function before 'validate"(here: data validation for user model) 
UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords not match')
        //if the passwords don't match. the category is confirmpassword and '' is the message the user see
    }
    next();// if pw matches, keep going on next step (here validating infomation)
})

//this should go after
// after info validation, before saving data to DB, hash pw. (never store original pw in the DB)
UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)//hash pw for 10 times
    .then(hash =>{
        this.password = hash;
        next();
    })
})

const User= mongoose.model('User', UserSchema);
module.exports = User

//the flow model-> set virtual key: value (here confirmPassword) -> compare pw (if match) -> run info validation -> hash pw -> save User