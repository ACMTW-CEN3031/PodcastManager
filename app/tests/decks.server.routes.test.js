'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	Deck = mongoose.model('Deck'),
	agent = request.agent(app);

var deck1, deck2;
describe('Deck CRUD tests', function()
{
	beforeEach(function(done)
	{
		deck1 = new Deck({ name: 'Test Deck', images: ['init.jpg'] });
		deck2 = new Deck({ name: 'Test Deck', images: ['test.jpg'] });

		done();
	});

	it('should not be able to save a deck with no name', function(done)
	{
		deck1.name = '';

		agent.post('/decks')
			.send(deck1)
			.expect(400)
			.end(function(err, res)
			{
				res.body.message.should.match('Deck must have a name');
				done(err);
			});
	});

	it('should not be able to save a deck with a non-unique name', function(done)
	{
		deck1.save();

		agent.post('/decks')
			.send(deck2)
			.expect(400)
			.end(function(err, res)
			{
				res.body.message.should.match('Name already exists');
				done(err);
			});
	});

	afterEach(function(done)
	{
		Deck.remove().exec();
		done();
	});
});
