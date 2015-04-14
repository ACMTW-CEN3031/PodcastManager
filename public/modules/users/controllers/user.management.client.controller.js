'use strict';

angular.module('users').controller('userManagement', ['$scope', '$stateParams','$location', 'ManagementService',
	function($scope, $stateParams, $location, ManagementService)
	{

		$scope.mId = 0;

		$scope.findOne = function()
		{
			$scope.mUser = ManagementService.mUser;
		};

		$scope.viewUser = function(mUser){
			ManagementService.mUser = mUser;
			$location.path('/users/:' + mUser._id);
		};

		$scope.find = function()
		{
			$scope.users = ManagementService.query();
		};

		$scope.remove = function(mUser)
		{
			if (mUser){
				mUser.$remove(function()
				{
					for (var i in $scope.users) {
		                if ($scope.users[i] === mUser) {
		                    $scope.users.splice(i, 1); // remove item from scope
		                }
		            }
				});
            }
		};
	}
]);