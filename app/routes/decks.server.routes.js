'use strict';

var users = require('../../app/controllers/users.server.controller'),
	decks = require('../../app/controllers/decks.server.controller');

module.exports = function(app)
{
	app.route('/decks')
		.get(decks.list)
		.post(decks.create);

	app.route('/decks/:deckId')
		.get(decks.show)
		.put(decks.update)
		.delete(decks.delete);

	app.param('deckId', decks.deckById);
};
