'use strict';

angular.module('users').factory('ManagementService', ['$resource',
	function($resource)
	{
		return $resource('users/:userId',
		{
			userId: '@_id',
			mUser: 0
		},
		{
			update: {method: 'PUT' },
			remove: {
                method: 'DELETE',
                url: 'users/:userId',
                params: {id: '@_id'}
            }
		});
	}
]);