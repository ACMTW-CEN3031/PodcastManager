'use strict';

angular.module('decks').controller('UploadController', ['$scope', '$location', 'UploadService',
	function($scope, $location, UploadService)
	{
		$scope.targetImage = '';

		$scope.uploadImage = function(e)
		{
			console.log(e.files[0]);
			$scope.targetImage = e.files[0];

			UploadService.saveImage($scope.deck, $scope.targetImage);
			$location.path('decks/' + $scope.deck._id + '/edit');
		};
	}
]);
