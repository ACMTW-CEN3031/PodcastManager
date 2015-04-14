'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageBoardSchema = new Schema({
	title:
	{
		type: String,
		default: '',
	},
	content:
	{
		type: String,
		default: ''
	},
	link:
	{
		type: String,
		default: ''
	},
	userName:
	{
		type: String,
		default: ''
	},
	comments:
	{
		type: [String],
		default: ''
	}
});

mongoose.model('messageBoard', MessageBoardSchema);