'use strict';

angular.module('decks').controller('UploadController', ['$scope', 'UploadService',
	function($scope, UploadService)
	{
		$scope.uploadService = UploadService;
		$scope.targetImage = '';

		$scope.uploadImage = function(e)
		{
			console.log(e.files[0]);
			$scope.targetImage = e.files[0];

			UploadService.saveImage($scope.targetImage);
		};
	}
]);
