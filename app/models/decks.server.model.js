'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var DeckSchema = new Schema({
	name:
	{
		type: String,
		default: '',
		required: 'Deck must have a name'
	},
	images:
	{
		type: [String],
		default: []
	}
});

mongoose.model('Deck', DeckSchema);
