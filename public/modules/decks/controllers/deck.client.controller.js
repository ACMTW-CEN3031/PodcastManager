'use strict';

angular.module('decks').controller('DeckController', ['$scope', '$stateParams', '$location', '$upload', 'DeckService',
	function($scope, $stateParams, $location, $upload, DeckService)
	{
		$scope.create = function()
		{
			var deck = new DeckService({
				name: this.name
			});

			deck.$save(function(res)
			{
				$location.path('decks/' + res._id);

				$scope.name = '';
			},
			function(err)
			{
				$scope.error = err.data.message;
			});
		};

		$scope.remove = function(deck)
		{
			deck.$remove(function()
			{
				var index = $scope.decks.indexOf(deck);
				$scope.decks.splice(index, 1);
			});
		};

		$scope.uploadImage = function(file)
		{
			var deck = $scope.deck;
			$scope.uploading = true;

			var fileReader = new FileReader();
			fileReader.readAsArrayBuffer(file);
			fileReader.onload = function(e)
			{
				$upload.http({
					url: 'https://api.imgur.com/3/image',
					headers:
					{
            			Authorization: 'Client-ID ' + 'd68cf8484744ab5'
       				},
       				data: e.target.result
				})
				.then(function(result)
				{
					var response = result.data;
					if (response.status !== 200)
					{
						$scope.error = 'Could not communicate with imgur!';
						return;
					}

					var url = response.data.link;
					var split = url.lastIndexOf('/');

					var name = url.substring(split);
					deck.images.push(name);

					deck.$update(function(res)
					{
						$scope.uploading = false;
						$location.path('decks/' + res._id + '/edit');
					},
					function(err)
					{
						$scope.error = err.data.message;
					});
				},
				null,
				function(evt)
				{
					$scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
				});
			};
		};

		$scope.removeImage = function(img)
		{
			var deck = $scope.deck;

			var index = deck.images.indexOf(img);
			deck.images.splice(index, 1);

			deck.$update(function(res)
			{
				$location.path('decks/' + res._id + '/edit');
			},
			function(err)
			{
				$scope.error = err.data.message;
			});
		};

		$scope.find = function()
		{
			$scope.decks = DeckService.query();
		};

		$scope.findOne = function()
		{
			$scope.deck = DeckService.get({
				deckId: $stateParams.deckId
			});
		};
	}
]);
