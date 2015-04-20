'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Deck = mongoose.model('Deck'),
	agent = request.agent(app);

var credentials, credentials2, user, user2, deck1, deck2;
describe('Deck CRUD tests', function()
{
	beforeEach(function(done)
	{
		credentials = {
			username: 'username',
			password: 'password'
		};

		credentials2 = {
			username: 'username2',
			password: 'password'
		};

		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			roles: ['admin'],
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			roles: ['user'],
			username: credentials2.username,
			password: credentials2.password,
			provider: 'local'
		});

		deck1 = new Deck({ name: 'Test Deck', images: ['init.jpg'] });
		deck2 = new Deck({ name: 'Test Deck', images: ['test.jpg'] });

		user.save(function() {
			user2.save(done);
		});
	});

	it('should be able to save a deck if logged in as admin', function(done)
	{
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(err, res)
			{
				if (err)
					done(err);

				agent.post('/decks')
					.send(deck1)
					.expect(200)
					.end(function(err, res)
					{
						if (err)
							done(err);

						agent.get('/decks')
							.end(function(err, res)
							{
								if (err)
									done(err);

								var decks = res.body;

								(decks[0].name).should.match('Test Deck');
								done();
							});
					});
			});
	});

	it('should not be able to save a deck if logged in as user', function(done)
	{
		agent.post('/auth/signin')
			.send(credentials2)
			.expect(200)
			.end(function(err, res)
			{
				if (err)
					done(err);

				agent.post('/decks')
					.send(deck1)
					.expect(403)
					.end(function(err, res)
					{
						done(err);
					});
			});
	});

	it('should not be able to save a deck if not logged in', function(done)
	{
		agent.post('/decks')
			.send(deck1)
			.expect(401)
			.end(function(err, res)
			{
				done(err);
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

	it('should be able to add an image to the deck if logged in as admin', function(done)
	{
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(err, res)
			{
				if (err)
					done(err);

				agent.post('/decks')
					.send(deck1)
					.expect(200)
					.end(function(err, res)
					{
						deck1.images.push('test2.png');
						agent.put('/decks/' + res.body._id)
							.send(deck1)
							.expect(200)
							.end(function(err, res2)
							{
								if (err)
									done(err);

								(res2.body._id).should.equal(res.body._id);
								(res2.body.images.length).should.equal(2);
								done();
							});
					});
			});
	});

	it('should not be able to add an image to the deck if logged in as user', function(done)
	{
		var deckObj = new Deck(deck1);

		deckObj.save(function()
		{
			agent.post('/auth/signin')
				.send(credentials2)
				.expect(200)
				.end(function(err, res)
				{
					if (err)
						done(err);

					deck1.images.push('test2.png');
					agent.put('/decks/' + deckObj._id)
						.send(deck1)
						.expect(403)
						.end(function(err, res)
						{
							done(err);
						});
				});
		});
	});

	it('should not be able to add an image to the deck if not logged in', function(done)
	{
		var deckObj = new Deck(deck1);

		deckObj.save(function()
		{
			deck1.images.push('test2.png');
			agent.put('/decks/' + deckObj._id)
				.send(deck1)
				.expect(401)
				.end(function(err, res)
				{
					done(err);
				});
		});
	});

	it('should not be able to get a list of decks if not logged in', function(done)
	{
		var deckObj = new Deck(deck1);

		deckObj.save(function()
		{
			request(app).get('/decks')
				.end(function(req, res)
				{
					(res.body.message).should.match('User is not logged in');
					done();
				});
		});
	});

	it('should be able to delete a deck if logged in as admin', function(done)
	{
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(err, res)
			{
				if (err)
					done(err);

				agent.post('/decks')
					.send(deck1)
					.expect(200)
					.end(function(err, res)
					{
						agent.delete('/decks/' + res.body._id)
							.send(deck1)
							.expect(200)
							.end(function(err, res2)
							{
								if (err)
									done(err);

								(res2.body._id).should.equal(res.body._id);
								done();
							});
					});
			});
	});

	it('should not be able to delete a deck if logged in as user', function(done)
	{
		var deckObj = new Deck(deck1);

		deckObj.save(function()
		{
			agent.post('/auth/signin')
				.send(credentials2)
				.expect(200)
				.end(function(err, res)
				{
					if (err)
						done(err);

					agent.delete('/decks/' + deckObj._id)
						.send(deck1)
						.expect(403)
						.end(function(err, res)
						{
							done(err);
						});
				});
		});
	});

	it('should not be able to delete a deck if not logged in', function(done)
	{
		var deckObj = new Deck(deck1);

		deckObj.save(function()
		{
			agent.delete('/decks/' + deckObj._id)
				.send(deck1)
				.expect(401)
				.end(function(err, res)
				{
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
