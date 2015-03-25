'use strict';

var users = require('../../app/controllers/users.server.controller'),
	messageBoard = require('../../app/controllers/messageBoard.server.controller');

module.exports = function(app)
{
	app.route('/messageBoard')
		.get(messageBoard.list)
		.post(messageBoard.post)
		.get(messageBoard.show)
		.put(messageBoard.update);


	app.param('postId', messageBoard.postById);
};