'use strict';

angular.module('decks').controller('DeckController', ['$scope', '$stateParams', '$location', '$upload', 'DeckService',
	function($scope, $stateParams, $location, $upload, DeckService)
	{

		//Used in Spread generation
		$scope.filteredDecks = [];
		$scope.cardsInSpread = [];
		$scope.cardsPerDeck = 1;

		$scope.randomize = false;
		$scope.randomCardAmt = 2;

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


		$scope.onRefreshClick = function()
		{
			if ($scope.randomize)
			{
				var i = 0;
				for (i = 0; i != $scope.decks.length; ++i)	{
					$scope.decks[i].inSpread = false;
				}

				$scope.randomizeDecks();
			}
			else
			{
				var i = 0;
				for (i = 0; i != $scope.filteredDecks.length; ++i){
					$scope.filteredDecks[i].inSpread = true;
				}

				$scope.updateInSpread();
			}

			$scope.$apply();
		}

		$scope.updateInSpread = function()
		{
			//TODO: error checking for parseInt
			$scope.cardsPerDeck = parseInt($scope.cardsPerDeck);
			$scope.cardsInSpread = [];

			//browse through each deck and pick $scope.cardsPerDeck random cards to display
			var i = 0;
			for (i = 0; i != $scope.filteredDecks.length; ++i)
			{
				var deck = $scope.filteredDecks[i];
				var j = 0;
				for (j = 0; j != $scope.cardsPerDeck; ++j)
				{
					var randomIndex = Math.floor(Math.random() * deck.images.length);
					var selectedImage = deck.images[randomIndex];

					$scope.cardsInSpread.push(selectedImage);
				}
			}

			$scope.$apply();
		};

		$scope.randomizeDecks = function()
		{
			//TODO: error checking for parseInt
			$scope.randomCardAmt = parseInt($scope.randomCardAmt);
			$scope.cardsInSpread = [];
			
			var i = 0;
			for (i = 0; i != $scope.randomCardAmt; ++i)	{
				var randomDeckIndex = Math.floor(Math.random() * $scope.decks.length);
				var selectedDeck = $scope.decks[randomDeckIndex];

				selectedDeck.inSpread = true;

				var randomImageIndex = Math.floor(Math.random() * selectedDeck.images.length);
				var selectedImage = selectedDeck.images[randomImageIndex];

				$scope.cardsInSpread.push(selectedImage); 
			}

			$scope.$apply();
			
		};

	}
]);
