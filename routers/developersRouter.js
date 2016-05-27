var express = require('express');
var Developer = require('../models/developer');

var developerRouter = express.Router();

developerRouter
	.route('/developers')
	.post(function (request, response) {

		var developerDocument = new Developer(request.body);

    developerDocument.save();

    response.status(201).send(developerDocument);

	})
	.get(function (request, response) {

    Developer.find(function (error, developerDocuments) {

      if (error) {
        response.status(500).send(error);
        return;
      }
    response.json(developerDocuments);
	});
});	

developerRouter
	.route('/developers/:developerId')	
	.get(function(request, response) {

		var developerId = request.params.developerId;

		Developer.findOne({ id: developerId }, function (error, developer){

			if (error) {
        response.status(500).send(error);
        return;
      }

      response.json(developer);
 
		});
	})
	.put(function(request, response) {

		var developerId = request.params.developerId;

		Developer.findOne({ id: developerId }, function (error, developer){

			if (error) {
        response.status(500).send(error);
        return;
      }

     	if (developer) {
        
        developer.first_name = request.body.first_name;
        developer.surname = request.body.surname;
        developer.job_title = request.body.job_title;
        developer.phone_number = request.body.phone_number;
        developer.cv = request.body.cv;
        developer.photo = request.body.photo;
        developer.html = request.body.html;
        developer.css = request.body.css;
        developer.less = request.body.less;
        developer.sass = request.body.sass;
        developer.javascript = request.body.javascript;
        developer.jquery = request.body.jquery;
        developer.reactjs = request.body.reactjs;
        developer.nodejs = request.body.nodejs;
        developer.linkedin = request.body.linkedin;
        developer.github = request.body.github;
        developer.portfolio = request.body.portfolio;
        developer.about_me = request.body.about_me;

        developer.save();

        response.json(developer);
        return;
      }
      response.status(404).json({
        message: 'Message with id ' + messageId + ' was not found.'
      });
		});
	})
	.patch(function (request, response) {

    var developerId = request.params.developerId;

    Message.findOne({ id: developerId }, function (error, developer) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (developer) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof developer[property] !== 'undefined') {
              developer[property] = request.body[property];
            }
          }
        }

        developer.save();

        response.json(developer);
        return;
      }

      response.status(404).json({
        message: 'Message with id ' + messageId + ' was not found.'
      });
    });
  })
	


module.exports = developerRouter;