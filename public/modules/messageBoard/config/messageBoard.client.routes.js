'use strict';

angular.module('messageBoard').config(['$stateProvider',
	function($stateProvider)
	{
		$stateProvider.
		state('messageBoard',
		{
			url: '/messageBoard?postId',
			templateUrl: 'modules/messageBoard/views/messageBoard.client.view.html',
			controller: 'messageController'
		});
	}
]);
