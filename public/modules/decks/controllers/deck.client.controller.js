'use strict';

angular.module('decks').controller('DeckController', ['$scope', '$stateParams', '$location', '$upload', 'DeckService',
	function($scope, $stateParams, $location, $upload, DeckService)
	{

		$scope.create = function()
		{
			var deck = new DeckService({
				name: this.name,
				description: this.description
			});

			deck.$save(function(res)
			{
				$location.path('decks/' + res._id);

				$scope.name = '';
				$scope.description = '';
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
					var url = result.data.link;
					var split = url.lastIndexOf('/');

					var name = url.substring(split);
					deck.images.push(name);

					deck.$update(function(res)
					{
						$scope.uploading = false;
						$scope.uploadProgress = 0;

						$location.path('decks/' + res._id + '/edit');
					},
					function(err)
					{
						$scope.uploading = false;
						$scope.uploadProgress = 0;

						$scope.error = err.data.message;
					});
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


		$scope.filteredDecks = [];
		$scope.cardsInSpread = [];
		$scope.numberOfCardsToShow = 2;

		$scope.onDeckClick = function(deck)
        {
        	deck.inSpread = !deck.inSpread;
			if (deck.inSpread){
				$scope.filteredDecks.push(deck);
			}
			else {
				var deckIndex = $scope.filteredDecks.indexOf(deck);
				if (deckIndex != -1){
					$scope.filteredDecks.splice(deckIndex, 1);
				}
			}

			$scope.updateInSpread();
		};

		$scope.onGoClick = function(){
			//TODO: Ensure only numbers are passed to input field
			$scope.numberOfCardsToShow = parseInt($scope.numDecks);

			//other spew

			$scope.updateInSpread();
		}
		$scope.updateInSpread = function(){
			$scope.cardsInSpread = [];

			var i = 0;
			for (i = 0; i < $scope.numberOfCardsToShow; i++){
				var randomIndex = Math.floor(Math.random() * $scope.filteredDecks.length);
				var selectedDeck = $scope.filteredDecks[randomIndex];

				var randomImage = Math.floor(Math.random() * $scope.filteredDecks[randomIndex].images.length);
				var selectedImage = selectedDeck.images[randomImage];

				$scope.cardsInSpread.push(selectedImage);
			}

			$scope.$apply();
		};

	}
]);
