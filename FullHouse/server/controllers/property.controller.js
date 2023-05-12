const Property = require('../models/property.model');

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
            console.log(req.body);
            const newProperty = await Property.create(req.body);
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

    deleteListing: (req, res) =>{
        Property.deleteOne({_id:req.params.id})
        .then(result =>{
            res.json(result)
        })
        .catch((err) =>{
            res.status(400).json(err)
        });
    }   
}