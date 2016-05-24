var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({

id: {
type: Number,
required: true
},

email: {
	type: String,
	unique: true,
  required: true
},

email_confirmation: {
	type: String,
	unique: true,
  required: true
},

password: {
	type: String,
	unique: true,
  required: true
},

password_confirmation: {
	type: String,
	unique: true,
  required: true
},

});

module.exports = mongoose.model('Employer', itemSchema);
