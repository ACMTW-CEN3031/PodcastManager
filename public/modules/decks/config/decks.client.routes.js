'use strict';

angular.module('decks').config(['$stateProvider',
	function($stateProvider)
	{
		// FIXME: Uncomment the below lines when there is an admin/teacher user.

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
			templateUrl: 'modules/decks/views/create-deck.client.view.html',
			data: { /* roles: ['teacher', 'admin'] */ }
		}).
		state('viewDeck',
		{
			url: '/decks/:deckId',
			templateUrl: 'modules/decks/views/view-deck.client.view.html'
		}).
		state('editDeck',
		{
			url: '/decks/:deckId/edit',
			templateUrl: 'modules/decks/views/edit-deck.client.view.html',
			data: { /* roles: ['teacher', 'admin'] */ }
		});
	}
]);/*.run(['$rootScope', '$location', 'Authentication',
	function($rootScope, $location, Authentication)
	{
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams)
		{
			if (!Authentication.user)
				$location.path('/');

			var roles = (toState.data && toState.data.roles) ? toState.data.roles : null;
			if (roles && !Authentication.meetsAnyRole(roles))
				$location.path('/');
		});
	}
]);*/
