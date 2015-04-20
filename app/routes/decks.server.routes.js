'use strict';

var users = require('../../app/controllers/users.server.controller'),
	decks = require('../../app/controllers/decks.server.controller');

module.exports = function(app)
{
	app.route('/decks')
		.get(users.requiresLogin, decks.list)
		.post(users.requiresLogin, users.hasAuthorization(['teacher', 'admin']), decks.create);

	app.route('/decks/:deckId')
		.get(users.requiresLogin, decks.show)
		.put(users.requiresLogin, users.hasAuthorization(['teacher', 'admin']), decks.update)
		.delete(users.requiresLogin, users.hasAuthorization(['teacher', 'admin']), decks.delete);

	app.param('deckId', decks.deckById);
};
