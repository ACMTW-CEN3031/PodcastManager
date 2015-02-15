'use strict';

angular.module('messageBoard').config(['$stateProvider',
	function($stateProvider)
	{
		$stateProvider.
		state('messageBoard',
		{
			url: '/messageBoard',
			templateUrl: 'modules/messageBoard/views/messageBoard.client.view.html'
		});
	}
]);
