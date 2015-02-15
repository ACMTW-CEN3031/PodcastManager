'use strict';

angular.module('messageBoard').run(['Menus',
	function(Menus)
	{
		Menus.addMenuItem('topbar', 'Collaborate', 'messageBoard', 'dropdown');
		Menus.addSubMenuItem('topbar', 'messageBoard', 'Message Board', 'messageBoard');
	}
]);
