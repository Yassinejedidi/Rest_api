const Client = require('../models/client.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "client content can not be empty"
        });
    }

    // Create a admin
    const client = new Client({
        name: req.body.name || "Untitled client",
        email: req.body.email,
        adresse: req.body.adresse,
        number: req.body.number,
        nic: req.body.nic,



    });

    // Save admin in the database
    client.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the client."
            });
        });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
    Client.find()
        .then(clients => {
            res.send(clients);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving client."
            });
        });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Client.findById(req.params.clientId)
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            res.send(client);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            return res.status(500).send({
                message: "Error retrieving client with id " + req.params.clientId
            });
        });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "name content can not be empty"
        });
    }

    // Find admin and update it with the request body
    Client.findByIdAndUpdate(req.params.clientId, {
        name: req.body.name || "Untitled client",
        email: req.body.email,
        adresse: req.body.adresse,
        number: req.body.number,
        nic: req.body.nic,
    }, { new: true })
        .then(client => {
            console.log("client", client)
            if (!client) {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            res.send(client);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            return res.status(500).send({
                message: "Error updating client with id " + req.params.clientId
            });
        });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            res.send({ message: "client deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "client not found with id " + req.params.clientId
                });
            }
            return res.status(500).send({
                message: "Could not delete client with id " + req.params.clientId
            });
        });
};
