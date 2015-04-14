'use strict';

angular.module('messageBoard').controller('messageController', ['$scope', '$location', '$state', 'messageBoardService', 'Authentication',
	function($scope, $location, $state, messageBoardService, Authentication)
	{
	$scope.user = Authentication.user;
	$scope.posts = [];
	$scope.content = '';
	$scope.title = '';
	$scope.link = '';
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
			link: this.link,
			userName: this.user.username
		});

			post.$save(function(res)
			{
				$state.reload();
			},
			function(err)
			{
				$scope.error = err.data.message;
			});
	};
	$scope.deletePost = function(post){
		post.$remove(function()
		{
			var index = $scope.posts.indexOf(post);
			$scope.posts.splice(index, 1);

			$state.reload();
		});
	};
	$scope.addComment = function(post){
		post.comments.push($scope.commentText);
		post.$update(function(res)
			{
				$state.reload();
			},
			function(err)
			{
				$scope.error = err.data.message;
			});	
	};
	$scope.find = function()
		{
			$scope.posts = messageBoardService.query();
		};

	$scope.findOne = function(id)
		{
			$scope.post = messageBoardService.get({
				postId: id
			});

			console.log($scope.post);
		};

	}
]);