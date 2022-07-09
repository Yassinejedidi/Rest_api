module.exports = (app) => {
    const clients = require('../controllers/client.controller.js');


    app.post('/clients', clients.create);


    app.get('/clients', clients.findAll);


    app.get('/clients/:clientsId', clients.findOne);


    app.put('/clients/:clientId', clients.update);


    app.delete('/clients/:clientId', clients.delete);
}
