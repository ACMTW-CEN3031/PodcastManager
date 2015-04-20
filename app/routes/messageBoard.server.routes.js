'use strict';

var users = require('../../app/controllers/users.server.controller'),
	messageBoard = require('../../app/controllers/messageBoard.server.controller');

module.exports = function(app)
{
	app.route('/messageBoard')
		.get(users.requiresLogin, messageBoard.list)
		.post(users.requiresLogin, messageBoard.post);
	app.route('/messageBoard/:postId')
		.get(users.requiresLogin, messageBoard.show)
		.put(users.requiresLogin, messageBoard.update)
		.delete(users.requiresLogin, messageBoard.delete);

	app.param('postId', messageBoard.postById);
};