'use strict';

var should = require('should'),
	mongoose = require('mongoose'),
	Deck = mongoose.model('Deck');

var deck1, deck2;
describe('Deck Model unit tests:', function()
{
	beforeEach(function(done)
	{
		deck1 = new Deck({
			name: 'My Deck',
			images: ['init.jpg']
		});
		deck2 = new Deck({
			name: 'My Deck',
			images: ['']
		});

		done();
	});

	describe('Deck Creation', function()
	{
		it('should begin with no decks', function(done)
		{
			Deck.find({}, function(err, decks)
			{
				decks.should.have.length(0);
				done();
			});
		});

		it('should be able to save a new deck', function(done)
		{
			deck1.save(done);
		});

		it('should not allow a deck to be saved with no name', function(done)
		{
			deck1.name = '';
			return deck1.save(function(err)
			{
				should.exist(err);
				done();
			});
		});

		it('should not be able to save a non-unique deck name', function(done)
		{
			deck1.save();
			return deck2.save(function(err)
			{
				should.exist(err);
				done();
			});
		});
	});

	describe('Deck Deletion', function()
	{
		it('should be able to delete a deck', function(done)
		{
			deck1.remove(done);
		});
	});

	afterEach(function(done)
	{
		Deck.remove().exec();
		done();
	});
});
