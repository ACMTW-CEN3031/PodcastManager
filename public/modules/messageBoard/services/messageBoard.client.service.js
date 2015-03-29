'use strict';

angular.module('messageBoard').factory('messageBoardService', ['$resource',
	function($resource)
	{
		return $resource('/messageBoard/:postId',
		{
			postId: '@_id'
		},
		{
			update: { method: 'PUT' }
		});
	}
]);