'use strict';

var users = require('../../app/controllers/users.server.controller'),
	decks = require('../../app/controllers/decks.server.controller'),
	multer = require('multer');

module.exports = function(app)
{
	app.use(multer({ dest: './public/uploads/' }));

	app.route('/decks')
		.get(decks.list)
		.post(decks.create);

	app.route('/decks/:deckId')
		.get(decks.show)
		.put(decks.update)
		.delete(decks.delete);

	app.route('/decks/:deckId/images')
		.post(decks.addImage);

	app.param('deckId', decks.deckById);
};
