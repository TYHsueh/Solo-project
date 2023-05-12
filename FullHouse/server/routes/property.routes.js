const PropertyController = require('../controllers/property.controller');

module.exports = app =>{
    app.get('/api/allProperties', PropertyController.findAllProperties);
    app.get('/api/allProperties/:id', PropertyController.findOneProperty);
    app.post('/api/newProperty', PropertyController.createListing);
    app.put('/api/allProperties/:id', PropertyController.updateListing);
    app.delete('/api/allProperties/:id', PropertyController.deleteListing);

}