'use strict';

angular.module('decks').run(['Menus',
	function(Menus)
	{
		Menus.addMenuItem('topbar', 'Decks', 'decks', 'dropdown');
		Menus.addSubMenuItem('topbar', 'decks', 'Make a Spread', 'generate');
		Menus.addSubMenuItem('topbar', 'decks', 'Browse Decks', 'decks');
		Menus.addSubMenuItem('topbar', 'decks', 'Create a Deck', 'decks/create');
	}
]);
