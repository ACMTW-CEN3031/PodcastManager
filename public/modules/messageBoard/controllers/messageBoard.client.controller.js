'use strict';

angular.module('messageBoard').controller('messageController', ['$scope', '$location', 'messageBoardService',
	function($scope, $location, messageBoardService)
	{
	$scope.posts = [];
	$scope.content = '';
	$scope.title = '';
	$scope.link = '';
	$scope.comments = ' ';
	$scope.addPost = function(){
	/*
	  if(!$scope.title || $scope.title === '') { return; }
	  $scope.posts.push({
	    title: $scope.title,
	    content: $scope.content,
	    link: $scope.link,
	  });

	  $scope.content = '';
	  $scope.title = '';
	  $scope.link = '';
	 */
		var post = new messageBoardService({
			title: this.title,
			content: this.content,
			link: this.link
		});

			post.$save(function(res)
			{
				//$location.path('messageBoard/' + res._id);

				$scope.title = '';
				$scope.content = '';
				$scope.link='';
				$scope.comments = '';
			},
			function(err)
			{
				$scope.error = err.data.message;
			});
	};
	/*
	$scope.deletePost = function(postId){
			postId.$remove(function()
			{
				var index = $scope.posts.indexOf(postId);
				$scope.postId.splice(index, 1);
			});
		};
	};
	*/
	$scope.find = function()
		{
			$scope.posts = messageBoardService.query();
		};

	$scope.findOne = function(id)
		{
			$scope.post = messageBoardService.get({
				postId: id
			});
		};

	}
]);