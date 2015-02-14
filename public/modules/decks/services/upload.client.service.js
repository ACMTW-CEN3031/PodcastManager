'use strict';

angular.module('decks').factory('UploadService', ['$http', '$rootScope',
	function($http, $rootScope)
	{
		var service = {};

		service.saveImage = function(deck, img)
		{
			var fd = new FormData();
			fd.append('file', img);

			$http.post('/decks/' + deck._id + '/images', fd,
			{
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			})
			.success(function()
			{
				console.log('Successfully uploaded new image');
			})
			.error(function(e)
			{
				console.log('Error uploading new image', e);
			});
		};

		return service;
	}
]);
