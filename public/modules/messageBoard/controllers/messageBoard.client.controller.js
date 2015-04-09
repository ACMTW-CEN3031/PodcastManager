'use strict';

angular.module('messageBoard').controller('messageController', ['$scope', '$location', '$state', 'messageBoardService',
	function($scope, $location, $state, messageBoardService)
	{
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
			link: this.link
		});

			post.$save(function(res)
			{
				$scope.title = '';
				$scope.content = '';
				$scope.link='';
				$scope.comments = '';

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
	$scope.addComment = function(post, comment){
		post.comments.push(comment);
		post.$update(function(res)
			{

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
		};

	}
]);