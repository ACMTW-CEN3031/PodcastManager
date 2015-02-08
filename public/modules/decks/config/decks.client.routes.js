'use strict';

angular.module('decks').config(['$stateProvider',
	function($stateProvider)
	{
		$stateProvider.
		state('generateSpread',
		{
			url: '/generate',
			templateUrl: 'modules/decks/views/generate-spread.client.view.html'
		}).
		state('viewSpread',
		{
			url: '/view/:cardSet',
			templateUrl: 'modules/decks/views/view-spread.client.view.html'
		}).
		state('listDecks',
		{
			url: '/decks',
			templateUrl: 'modules/decks/views/list-decks.client.view.html'
		}).
		state('createDeck',
		{
			url: '/decks/create',
			templateUrl: 'modules/decks/views/create-deck.client.view.html'
		}).
		state('viewDeck',
		{
			url: '/decks/:deckId',
			templateUrl: 'modules/decks/views/view-deck.client.view.html'
		}).
		state('editDeck',
		{
			url: '/decks/:deckId/edit',
			templateUrl: 'modules/decks/views/edit-deck.client.view.html'
		});
	}
]);
