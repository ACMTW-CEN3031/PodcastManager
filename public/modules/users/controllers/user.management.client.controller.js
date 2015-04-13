'use strict';

angular.module('users').controller('userManagement', ['$scope', '$location', 'ManagementService',
	function($scope, $location, userManagementService)
	{
		$scope.find = function()
		{
			$scope.users = ManagementService.query();
		};

		$scope.remove = function(user)
		{
			user.$remove(function()
			{
				var index = $scope.users.indexOf(user);
				$scope.users.splice(index, 1);
			});
		};
	}
]);