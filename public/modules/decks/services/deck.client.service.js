'use strict';

angular.module('decks').factory('DeckService', ['$resource',
	function($resource)
	{
		return $resource('decks/:deckId',
		{
			deckId: '@_id'
		},
		{
			update: { method: 'PUT' }
		});
	}
]);
