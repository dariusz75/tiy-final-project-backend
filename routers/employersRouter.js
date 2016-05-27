var express = require('express');
var Employer = require('../models/employer');

var employerRouter = express.Router();

employerRouter
	.route('/employers')
	.post(function (request, response) {

		var employerDocument = new Employer(request.body);

    employerDocument.save();

    response.status(201).send(employerDocument);

	});


module.exports = employerRouter;