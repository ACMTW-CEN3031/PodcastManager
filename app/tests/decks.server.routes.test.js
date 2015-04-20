'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Deck = mongoose.model('Deck'),
	agent = request.agent(app);

var credentials, user, deck1, deck2;
describe('Deck CRUD tests', function()
{
	beforeEach(function(done)
	{
		credentials = {
			username: 'username',
			password: 'password'
		};

		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		user.save(function() {
			deck1 = new Deck({ name: 'Test Deck', images: ['init.jpg'] });
			deck2 = new Deck({ name: 'Test Deck', images: ['test.jpg'] });

			done();
		});
	});

	it('should not be able to save a deck with no name', function(done)
	{
		deck1.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(err, res)
			{
				if (err)
					done(err);

				agent.post('/decks')
					.send(deck1)
					.expect(400)
					.end(function(err, res)
					{
						res.body.message.should.match('Deck must have a name');
						done(err);
					});
			});
	});

	it('should not be able to save a deck with a non-unique name', function(done)
	{
		deck1.save();

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(err, res)
			{
				if (err)
					done(err);

				agent.post('/decks')
					.send(deck2)
					.expect(400)
					.end(function(err, res)
					{
						res.body.message.should.match('Name already exists');
						done(err);
					});
			});
	});

	afterEach(function(done)
	{
		User.remove().exec(function()
		{
			Deck.remove().exec(done);
		});
	});
});
