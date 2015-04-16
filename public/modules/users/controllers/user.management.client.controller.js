'use strict';

angular.module('users').controller('userManagement', ['$scope', '$state', '$stateParams','$location', 'ManagementService',
	function($scope, $state, $stateParams, $location, ManagementService)
	{

		$scope.mId = 0;
		$scope.roles = ['user', 'teacher', 'admin'];
		$scope.showSave = [];

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

		$scope.$on('$locationChangeStart', function( event ) {
			for (var mUser in $scope.users){
				$scope.users[mUser].$update(function(response) {
					console.log('Saved user' + $scope.users[mUser].displayName);
					$scope.success = true;
				}, function(response) {
					$scope.error = response.data.message;
				});
			}
		});

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
			/*
			mUser.roles = [role];
			console.log(mUser);
			mUser.$update(function()
			{
				$state.reload();
			});
			*/
			$scope.showSave[mUser] = false;
		}
	}
]);