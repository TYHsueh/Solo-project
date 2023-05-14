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
        try{
                console.log('REQ BODY', req.body);
                //use .decode() function to retrive info in userToken from cookies
                const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true});
                console.log('DECODED JWT', decodedJwt);
                //the logged in user id is inside payload, add user_id to 
                const propertyWithUserId = {...req.body, user_id:decodedJwt.payload._id};
                console.log('FINALIZED PROPERTY', propertyWithUserId);
                
                //now use propertyWithUserId to create new property
                const newProperty = await Property.create(propertyWithUserId);
                res.status(201).json(newProperty);
            }
        catch(err){
            res.status(400).json(err)
        }
    },

    updateListing: async (req, res) =>{
        try{
            const updatedListing = await Property.findOneAndUpdate(
                {_id:req.params.id},
                req.body,
                {new: true, runValidators: true}
            )
            res.status(201).json(updatedListing)
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
    //         const decodedJwt = jwt.decode(req.cookies.userToken, {complete:true});
    //         const loggedInUserId=decodedJwt.payload._id;
    //         const thisProperty = Property.findOne({_id:req.params.id});
    //         if(thisProperty.user_id === loggedInUserId){
    //             Property.deleteOne({_id:req.params.id})
    //         }

    //     }
    //     catch(err){
    //         res.status(401).json(err)
    //     }
    // },

    deleteListing: (req, res) =>{
        // const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
        // const loggedInUserId = decodedJwt.payload._id;
        // const thisProperty = Property.findOne({ _id: req.params.id });
        Property.deleteOne({_id:req.params.id})
        .then(result =>{
            res.json(result)
        })
        .catch((err) =>{
            res.status(400).json(err)
        });
    }   
}