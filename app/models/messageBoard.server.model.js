'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageBoardSchema = new Schema({
	title:
	{
		type: String,
		default: '',
		required: 'Post must have a title.'
	},
	content:
	{
		type: String,
		default: '',
		required: 'Post must have content.'
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
	},
	created:
	{
		type: Date
	}
});

mongoose.model('messageBoard', MessageBoardSchema);