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

/*
	describe('$scope.create', function() {//The function were testing
		it('creates a deck for the user', function() {
			var $scope = {};
			var controller = $controller('DeckController', { $scope: $scope }); 
			var deckLength = $scope.decks.length;
			$scope.create();
			expect($scope.decks.length).toEqual(decklength+1);
		});
	});

	describe('$scope.remove', function() {
		it('removes a deck from the user', function() {
			var $scope = {};
			var controller = $controller('DeckController', { $scope: $scope });
			var deck = $scope.create();
			var deckLength = $scope.decks.length;
			$scope.remove(deck);
			expect($scope.deckLength).toEqual(deckLength-1);
		});
	});
*/

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

/*
	describe('$scope.find', function() {
		it('finds the Deckservice Query', function() {
			var $scope = {};
			var controller = $controller('DeckController', { $scope: $scope });
			$scope.find();
			expect($scope.decks).toEqual('Deckservice.query()');
		});
	});
*/

	it('Finds a single deck based on ID', function(Deck)
	{
		var deck = new Deck({ _id: '525a8422f6d0f87f0e407a33', name: 'Test', images: ['init.jpg'] });
		$stateParams.deckId = deck._id;
		scope.findOne();
		expect($scope.deck).toEqual(deck);
	});
});