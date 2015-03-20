'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', '$upload', 'Users', 'Authentication',
	function($scope, $http, $location, $upload, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		$scope.uploadImage = function(file)
		{
			var user = $scope.user;

			var fileReader = new FileReader();
			fileReader.readAsArrayBuffer(file);
			fileReader.onload = function(e)
			{
				$scope.uploading = true;

				$upload.http({
					url: 'https://api.imgur.com/3/image',
					headers:
					{
            			Authorization: 'Client-ID ' + 'd68cf8484744ab5'
       				},
       				data: e.target.result
				})
				.success(function(result)
				{
					$scope.uploading = false;
					$scope.uploadProgress = 0;

					var url = result.data.link;
					var split = url.lastIndexOf('/');

					var name = url.substring(split);
					user.thumbnail = name;

					$scope.updateUserProfile(true);
				})
				.error(function(err)
				{
					$scope.uploading = false;
					$scope.uploadProgress = 0;
					
					if (err.status === 400)
						$scope.error = 'Invalid file!';
					else
						$scope.error = 'Could not communicate with imgur!';
				})
				.progress(function(evt)
				{
					// Decrease the percentage since 99% looks done when it is not.
					var percent = parseInt(100.0 * evt.loaded / evt.total);
					$scope.uploadProgress = Math.max(percent - 5, 0);
				});
			};
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		//upload picture
	}
]);