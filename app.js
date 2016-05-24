var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Developer = require('./models/developer.js');

var app = express();

var PORT = 8080;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'finalProject';

mongoose.connect('mongodb://' + HOST_NAME + '/' + DATABASE_NAME);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var developerRouter = express.Router();

developerRouter
	.route('/items')
	.post(function (request, response){
		console.log('POST / items');

		var developer = new Developer(request.body);

		developer.save();

		response.status(201).send(developer);
	})
	.get(function (request, response){

		console.log('GET / items');

		Developer.find(function (error, developer){

			console.log(error);

			if (error) {
				response.status(500).send(error);
				return;
			}
			console.log(developer);

			response.json(developer);
		});
	});

developerRouter
	.route('/items/:itemId')
	.get(function (request, response) {

		console.log('GET / items/:itemId');

		var itemId = request.params.itemId;

		Developer.findOne({ id: itemId }, function (error, developer){

			if (error) {
				response.status(500).send(error);
				return;
			}

			console.log(developer);

			response.json(developer);

		});
	})
	.put(function (request, response) {
		console.log('PUT / items / :itemId');

		var itemId = request.params.itemId;

		Developer.findOne({ id: itemId }, function (error, developer){

		if (error) {
				response.status(500).send(error);
				return;
			}

		if (developer) {
			developer.email = request.body.email;
			developer.email_confirmation = request.body.email_confirmation;
			developer.password = request.body.password;
			developer.password_confirmation = request.body.password_confirmation;
			developer.first_name = request.body.first_name;
			developer.surname = request.body.surname;
			developer.job_title = request.body.job_title;
			developer.phone_number = request.body.phone_number;
			developer.cv = request.body.cv;
			developer.photo = request.body.photo;

			developer.save();

			response.json(developer);
			return;
		}

		response.status(404).json({
			message: 'Item with id ' + itemId + ' was found.'
		});
	});
})
	.patch(function (request, response) {
		console.log('PATCH / items / :itemId');

		var itemId = request.params.itemId;

		Developer.findOne({ id: itemId }, function (error, developer){

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
			message: 'Item with id ' + itemId + ' was not found.'
		});
	});
})
	.delete (function (request, response){

		console.log('DELETE / items /:itemId');

		var itemId = request.params.itemId;

		Developer.findOne({ id: itemId }, function (error, developer) {
			if (error) {
				response.status(500).send(error);
				return;
			}

			if (developer) {
				developer.remove(function (error) {
					if (error) {
						response.status(500).send(error);
					}

					response.status(204).json({
						message: 'Item with id ' + itemId + ' was removed.'
					});
				});
			} else {
				response.status(404).json({
				message: 'Item with id ' + itemId + ' was not found.'
			});
		}
	});
});

app.use('/api', developerRouter);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
