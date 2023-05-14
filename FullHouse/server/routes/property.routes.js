const PropertyController = require('../controllers/property.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = app =>{
    app.get('/api/allProperties', authenticate, PropertyController.findAllProperties);
    app.get('/api/allProperties/:id', authenticate, PropertyController.findOneProperty);
    //before creating new listing must go through user authentication
    app.post('/api/newProperty', authenticate, PropertyController.createListing);
    app.put('/api/allProperties/:id', authenticate, PropertyController.updateListing);
    app.delete('/api/allProperties/:id', authenticate, PropertyController.deleteListing);
    app.get('/api/myListings', authenticate, PropertyController.allListingsByLoggedInUser)
}