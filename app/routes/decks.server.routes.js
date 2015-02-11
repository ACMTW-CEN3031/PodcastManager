'use strict';

var users = require('../../app/controllers/users.server.controller'),
	decks = require('../../app/controllers/decks.server.controller'),
	multer = require('multer');

module.exports = function(app)
{
	app.use(multer({ dest: './public/uploads/' }));

	app.route('/images')
		.post(decks.createImage);
}
