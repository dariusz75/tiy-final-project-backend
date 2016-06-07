var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({

id: {
	type: String,
	type: Number,
	required: true
},

email: {
	type: String,
	unique: true,
  required: true
},

password: {
	type: String,
	unique: true,
  required: true
},

first_name: {
	type: String,
	required: true
},

surname: {
	type: String,
	required: true
},

job_title: {
	type: String,
	required: true
},

phone_number: {
	type: String,
	required: true
},

cv: {
	type: String,
	required: true
},

photo: {
	type: String,
},

html: {
	type: Boolean
},

css: {
	type: Boolean
},

less: {
	type: Boolean
},

sass: {
	type: Boolean
},

javascript: {
	type: Boolean
},

jquery: {
	type: Boolean
},

reactjs: {
	type: Boolean
},

nodejs: {
	type: Boolean
},

linkedin: {
	type: String
},

github: {
	type: String
},

portfolio: {
	type: String
},

about_me: {
	type: String
}
}, 
{collection: 'developers'}
);

module.exports = mongoose.model('Developer', itemSchema);
