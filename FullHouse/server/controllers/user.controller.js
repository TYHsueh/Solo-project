const User = require('../models/user.model');
// need to import tools for creating cookies
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//using async/await instead of .then/.catch
//register user controller
module.exports = {
    registerUser: async (req, res) =>{
        try{
            //check if the email already exsited
            const potentialUser = await User.findOne({email:req.body.email})
            if(potentialUser){
                res.status(400).json({errors: {email: {message:'Email already exsits please login'}} })
                // ! need to set json as this format to match the error message format in component Register
            }else{
                //create user
                const newUser = await User.create(req.body)

                //Generate userToken (you can store any user info, here we store user id/first name/email)
                //1. the info you want to hold in jwt(in this case id and email)
                //2. can only be decoded using secret key stored in .env file
                //3.the token is valid for 2 hour(you can change time ex. 30m or 1d)
                const userToken = jwt.sign({_id:newUser._id, email:newUser.email, firstName: newUser.firstName}, secret, {expiresIn:'2h'});
                console.log(userToken);

                //sending user data back to the client (for credential) => log the newly create user in
                //also create cookie with key userToken and value is the userToken we just created
                res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2*60*60*1000}).json(newUser);
            }
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    //Login user controller
    loginUser: async (req, res) =>{
        try{
            //check if the user already existed
            const user = await User.findOne({email:req.body.email})
            if(user){
                //email(user) existed, check if pw enetered matches the one in DB
                const pwMatch = await bcrypt.compare(req.body.password, user.password)
                if(pwMatch){
                    //generate userToken (same as register, but the id and eamil come from user)
                    const userToken = jwt.sign({_id:user._id, email:user.email, firstName: user.firstName}, secret, {expiresIn:'2h'})
                    console.log(userToken)
                    //log the user in (generate cookies)
                    res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2*60*60*1000}).json(user)
                    //use .json(user) to send user's data to client (in console, so we can retrive it from front-end)
                    //in js, we can ues localStorage.getItem() and set it to useState to display info in componenets
                }else{
                    //if the pw does not match
                    res.status(400).json({message:'Invalid email/password'})
                }
            }else{
                //if the email does not in the DB(no such user)
                res.status(400).json({message:'Invalid email/password'})
            }
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    //log out user(clear userToken/cookies)
    logoutUser: (req, res)=>{
        res.clearCookie('userToken').json({message:'You logged out'})
    },

    findOneUser:async (req, res) => {
        try{
            console.log(req.params);
            const theUser = await User.findOne({email:req.params.email})
            res.status(200).json(theUser);
        }
        catch(err){
            res.status(400).json(err)
        }
    }
}