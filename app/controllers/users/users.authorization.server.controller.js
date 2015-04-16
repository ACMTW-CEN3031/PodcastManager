'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	errorHandler = require('../errors.server.controller'),
	User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

exports.delete = function(req, res)
{
	return User.findById(req.params.userId, function(err, mUser){
		return mUser.remove(function(err){
			if (!err) {
				console.log('removed');
			    return res.send('');
			} else {
			    console.log(err);
			}
  		});
	});
};


exports.show = function(req, res)
{
	res.json(req.user);
};

exports.list = function(req, res)
{
	User.find().sort('displayName').exec(function(err, users)
	{
		if (err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			res.json(users);
		}
	});
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};