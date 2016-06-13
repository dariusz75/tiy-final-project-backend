var express = require('express');
var Employer = require('../models/employer');
var bcrypt = require('bcrypt');
var jsonwebtoken = require('jsonwebtoken');
var TOKEN_SECRET = 'this_is_a_secret';
var TOKEN_EXPIRES = 3600;
var employerRouter = express.Router();


employerRouter
	.route('/employers')
	.post(function createUser(request, response) {

  console.log(request.body);

  // find the user
  Employer.findOne({
    email: request.body.email
  }, function handleQuery(error, employer) {

    if (error) {
      response.status(500).json({
        success: false,
        message: 'Internal server error'
      });

      return;
    }

    if (employer) {
      response.status(409).json({
        success: false,
        message: 'Employer with this email \'' + request.body.email+ '\' already exists.'
      });

      return;
    }

    bcrypt.genSalt(10, function (error, salt) {

      if (error) {
        response.status(500).json({
          success: false,
          message: 'Internal server error'
        });

        throw error;
      }

      console.log(request.body.password, salt);

      bcrypt.hash(request.body.password, salt, function (error, hash) {

        if (error) {
          response.status(500).json({
            success: false,
            message: 'Internal server error'
          });

          throw error;
        }

        var employer = new Employer({
        	id: request.body.id,
          email: request.body.email,
          password: hash
        });

        employer.save(function (error) {

          if (error) {
            response.status(500).json({
              success: false,
              message: 'Internal server error'
            });

            throw error;
          }
					// create a token
	      	var token = jsonwebtoken.sign({ email: employer.email }, TOKEN_SECRET, {
	        	expiresIn: TOKEN_EXPIRES
	      	});

          response.json({
            success: true,
            employer: employer,
            token: token
          });
        });
      });
    });
  });
});


module.exports = employerRouter;