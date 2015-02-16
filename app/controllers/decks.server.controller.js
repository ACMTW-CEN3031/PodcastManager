'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Deck = mongoose.model('Deck'),
	_ = require('lodash');

exports.create = function(req, res)
{
	var deck = new Deck(req.body);

	deck.save(function(err)
	{
		if (err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			res.json(deck);
		}
	});
};

exports.show = function(req, res)
{
	res.json(req.deck);
};

exports.addImage = function(req, res)
{
	var deck = req.deck;
	deck.images.push(req.files.file.name);

	deck.save(function(err)
	{
		if (err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			res.json(deck);
		}
	});
};

exports.list = function(req, res)
{
	Deck.find().sort('name').exec(function(err, decks)
	{
		if (err)
		{
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
		else
		{
			res.json(decks);
		}
	});
};

exports.deckById = function(req, res, next, id)
{
	if (!mongoose.Types.ObjectId.isValid(id))
	{
		return res.status(400).send({
			message: 'Deck is invalid'
		});
	}

	Deck.findById(id).exec(function(err, deck)
	{
		if (err)
			return next(err);

		if (!deck)
		{
			return res.status(404).send({
				message: 'Deck not found'
			});
		}

		req.deck = deck;
		next();
	});
};
