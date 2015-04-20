'use strict';

describe('DeckController', function()
{
	beforeEach(module(ApplicationConfiguration.applicationModuleName));

	var scope, $stateParams;
	beforeEach(inject(function($rootScope, _$stateParams_)
	{
		scope = $rootScope.$new();
		$stateParams = _$stateParams_;
	}));

	it('Removes a deck', function(Deck)
	{
		var deck = new Deck({ _id: '525a8422f6d0f87f0e407a33', name: 'Test', images: ['init.jpg'] });
		scope.decks = [deck];

		scope.deletePost(deck);
		expect(scope.decks.length).toBe(0);
	});

	it('Adds an image to a deck', function(Deck)
	{
		scope.deck = new Deck({ name: 'Test', images: ['init.jpg'] });
		var imagesCount = scope.deck.images.length;
		scope.uploadImage('test.png');
		expect(scope.deck.images.length).toEqual(imagesCount+1);
	});

	it('Removes an image from a deck', function(Deck)
	{
		scope.deck = new Deck({ name: 'Test', images: ['init.jpg'] });
		var imagesCount = scope.deck.images.length;
		scope.removeImage('init.jpg');
		expect(scope.deck.images.length).toEqual(imagesCount-1);
	});

	it('Finds multiple decks in a query', function(Deck)
	{
		var deck = new Deck({ _id: '525a8422f6d0f87f0e407a33', name: 'Test', images: ['init.jpg'] });

		scope.find();
		expect(scope.decks).toEqual([deck]);
	});

	it('Finds a single deck based on ID', function(Deck)
	{
		var deck = new Deck({ _id: '525a8422f6d0f87f0e407a33', name: 'Test', images: ['init.jpg'] });
		$stateParams.deckId = deck._id;
		scope.findOne();
		expect(scope.deck).toEqual(deck);
	});
});