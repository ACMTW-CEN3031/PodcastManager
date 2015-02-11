'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ImageSchema = new Schema({
	name:
	{
		type: String,
		default: ''
	}
});

mongoose.model('Image', ImageSchema);
