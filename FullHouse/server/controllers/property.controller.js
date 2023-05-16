const Property = require('../models/property.model');
const jwt = require('jsonwebtoken');

module.exports = {
    findAllProperties: async (req, res) =>{
        try{
            const allProperties = await Property.find();
            res.status(200).json(allProperties);
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    findOneProperty: async (req, res) =>{
        try{
            console.log(req.params);
            const oneProperty = await Property.findOne({_id:req.params.id});
            res.status(200).json(oneProperty);
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    createListing: async (req, res) =>{
        try {
            //use .decode() function to retrive info in userToken from cookies
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            console.log('DECODED JWT', decodedJwt);
            console.log('REQ BODY', req.body);
            // ! did not work!!! since without authericate/{withCredential:true}, jwt.decode did not work
            //if (!decodedJwt) {
            //    res.status(400).json({ errors: { login: { message: 'Please log in' } } })
            //} else {
                //use .decode() function to retrive info in userToken from cookies
                //the logged in user id is inside payload, add user_id to 
            const propertyWithUserId = { ...req.body, user_id: decodedJwt.payload._id };
            console.log('FINALIZED PROPERTY', propertyWithUserId);

                //now use propertyWithUserId to create new property
            const newProperty = await Property.create(propertyWithUserId);
            res.status(201).json(newProperty);
            //}
        }
        catch (err) {
            res.status(400).json(err)
        }
    },

    updateListing: async (req, res) =>{
        try{
            //check if the logged in user the creator of the listing
            const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true});
            const loggedInUserId=decodedJwt.payload._id;
            //console.log(loggedInUserId);
            const thisProperty = await Property.findOne({_id:req.params.id});
            //console.log(thisProperty.user_id)
            if(thisProperty.user_id != loggedInUserId){
                //set the json this way to match the format of error message 
                res.status(400).json({errors:{owner:{message:'You are not the owner'}}})
            }else{
                const updatedListing = await Property.findOneAndUpdate(
                    {_id:req.params.id},
                    req.body,
                    {new: true, runValidators: true}
                )
                res.status(201).json(updatedListing)
            }
        }
        catch(err){
            res.status(400).json(err)
        }
    },

    //find all listing of logged in user
    allListingsByLoggedInUser: async (req, res) =>{
        try{
            const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true});
            const user_id = decodedJwt.payload._id
            const properties = await Property.find({user_id:user_id});
            res.status(200).json(properties)
        }
        catch(err){
            res.status(401).json(err)
        }
    },

    // deletListing: async (req, res) =>{
    //     try{
            // const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true});
            // const loggedInUserId=decodedJwt.payload._id;
            // const thisProperty = await Property.findOne({_id:req.params.id});
    //         if(thisProperty.user_id !== loggedInUserId){
    //             res.status(400).json({message:'You are not the owner'})
    //         }else{
    //             const deletedProperty = await Property.deleteOne({_id:req.params.id})
    //             res.status(200).json(result);
    //         }
    //     }
    //     catch(err){
    //         res.status(401).json(err)
    //     }
    // },

    // deleteListing: (req, res) =>{
    //     // const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
    //     // const loggedInUserId = decodedJwt.payload._id;
    //     // const thisProperty = Property.findOne({ _id: req.params.id });
    //     Property.deleteOne({_id:req.params.id})
    //     .then(result =>{
    //         res.json(result)
    //     })
    //     .catch((err) =>{
    //         res.status(400).json(err)
    //     });
    // },

    deleteListing: async (req, res) =>{
        try{
            const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true});
            const loggedInUserId=decodedJwt.payload._id;
            //console.log(loggedInUserId);
            const thisProperty = await Property.findOne({_id:req.params.id});
            //console.log(thisProperty.user_id)
            if(thisProperty.user_id != loggedInUserId){
                res.status(401).json({message:'You are not the owner'})
            }else{
                const deleteProperty = await Property.deleteOne({_id:req.params.id})
                res.status(200).json(deleteProperty)
            }
        }
        catch(err){
            res.status.json(err)
        }
    }
}