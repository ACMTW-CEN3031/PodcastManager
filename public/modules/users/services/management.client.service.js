'use strict';

angular.module('users').factory('ManagementService', ['$resource',
	function($resource)
	{
		return $resource('users/:userId',
		{
			userId: '@_id'
		},
		{
			update: {method: 'PUT' }
		});
	}
]);