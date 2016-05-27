var express = require('express');
var Developer = require('../models/developer');

var developerRouter = express.Router();

developerRouter
	.route('/developers')
	.post(function (request, response) {

		console.log('POST /email');

		var email = new Email(request.body);

    email.save();

    response.status(201).send(email);

	}