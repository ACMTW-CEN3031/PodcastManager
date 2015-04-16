'use strict';

angular.module('users').controller('userManagement', ['$scope', '$state', '$stateParams','$location', 'ManagementService', 'Authentication', 'Users',
	function($scope, $state, $stateParams, $location, ManagementService, Authentication, Users)
	{

		$scope.mId = 0;
		$scope.roles = ['user', 'teacher', 'admin'];
		$scope.showSave = [];
		$scope.user = Authentication.user;


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
			for (var mUser in $scope.users){
				$scope.showSave[mUser] = false;
			}
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

		$scope.saveVisibility = function(mUser){
			for (var i in $scope.users){
				if (mUser === $scope.users[i]){
					$scope.showSave[i] = true;
				}
			}
		}
		$scope.changeRole = function(mUser, role)
		{
			var tUser = new ManagementService(mUser);

			tUser.roles = [role];
			console.log(tUser);
			tUser.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			for (var i in $scope.users){
				if (mUser === $scope.users[i]){
					$scope.showSave[i] = false;
				}
			}
			$scope.reload();
		}
	}
]);