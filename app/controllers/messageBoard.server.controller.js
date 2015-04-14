'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	messageBoard = mongoose.model('messageBoard'),
	_ = require('lodash');

exports.post = function(req, res)
{
	var post = new messageBoard(req.body);
	post.created = Date.now();

	post.save(function(err)
	{
		if (err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			res.json(post);
		}
	});
};

exports.delete = function(req, res)
{
	var post = req.post;

	post.remove(function(err)
	{
		if (err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			res.json(post);
		}
	});
};

exports.show = function(req, res)
{
	res.json(req.post);
};

exports.update = function(req, res)
{
	var post = req.post;
	post = _.extend(post, req.body);

	post.save(function(err)
	{
		if (err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			res.json(post);
		}
	});
};
exports.list = function(req, res)
{
	messageBoard.find().exec(function(err, messageBoard)
	{
		if (err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			res.json(messageBoard);
		}
	});
};
exports.postById = function(req, res, next, id)
{
	if (!mongoose.Types.ObjectId.isValid(id))
	{
		return res.status(400).send({
			message: 'Post is invalid'
		});
	}

	messageBoard.findById(id).exec(function(err, post)
	{
		if (err)
			return next(err);

		if (!post)
		{
			return res.status(404).send({
				message: 'Post not found'
			});
		}

		req.post = post;
		next();
	});
};
