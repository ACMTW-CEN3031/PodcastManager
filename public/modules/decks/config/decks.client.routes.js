'use strict';

angular.module('decks').config(['$stateProvider',
	function($stateProvider)
	{
		// FIXME: Uncomment the below lines when there is an admin/teacher user.

		$stateProvider.
		state('generateSpread',
		{
			url: '/generate',
			templateUrl: 'modules/decks/views/generate-spread.client.view.html',
			data: { requiresLogin: true }
		}).
		state('viewSpread',
		{
			url: '/view/:cardSet',
			templateUrl: 'modules/decks/views/view-spread.client.view.html',
			data: { requiresLogin: true }
		}).
		state('listDecks',
		{
			url: '/decks',
			templateUrl: 'modules/decks/views/list-decks.client.view.html',
			data: { requiresLogin: true }
		}).
		state('createDeck',
		{
			url: '/decks/create',
			templateUrl: 'modules/decks/views/create-deck.client.view.html',
			data: { requiresLogin: true /* roles: ['teacher', 'admin'] */ }
		}).
		state('viewDeck',
		{
			url: '/decks/:deckId',
			templateUrl: 'modules/decks/views/view-deck.client.view.html',
			data: { requiresLogin: true }
		}).
		state('editDeck',
		{
			url: '/decks/:deckId/edit',
			templateUrl: 'modules/decks/views/edit-deck.client.view.html',
			data: { requiresLogin: true /* roles: ['teacher', 'admin'] */ }
		});
	}
]).run(['$rootScope', '$location', 'Authentication',
	function($rootScope, $location, Authentication)
	{
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams)
		{
			if (!toState.data)
				return;
			if (!toState.data.requiresLogin)
				return;

			if (!Authentication.user)
				$location.path('/');

			var roles = (toState.data.roles) ? toState.data.roles : null;
			if (roles && !Authentication.meetsAnyRole(roles))
				$location.path('/');
		});
	}
]);
