'use strict';

angular.module('decks').controller('UploadController', ['$scope', 'UploadService',
	function($scope, UploadService)
	{
		$scope.uploadService = UploadService;
		$scope.targetImage = '';

		$scope.uploadImage = function(e)
		{
			console.log(e.target.files[0]);
			$scope.targetImage = e.target.files[0];
		};

		$scope.createImage = function()
		{
			UploadService.saveImage($scope.targetImage);
		};
	}
]);
