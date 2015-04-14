'use strict';

angular.module('messageBoard').controller('messageController', ['$scope', '$stateParams', '$location', '$state', 'messageBoardService', 'Authentication',
	function($scope, $stateParams, $location, $state, messageBoardService, Authentication)

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
	 	if ($scope.new_title == undefined || $scope.new_content == undefined)
	 	{
	 		$scope.error = "Post cannot be blank.";
	 		return;
	 	}

		var post = new messageBoardService({
			title: this.new_title,
			content: this.new_content,
			link: this.new_link,
			userName: this.user.username
		});

			post.$save(function(res)
			{
				$location.path('messageBoard').search({ postId: post._id });
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
				//
			},
			function(err)
			{
				$scope.error = err.data.message;
			});	
	};
	$scope.find = function()
		{
			$scope.posts = messageBoardService.query(function()
			{
				if ($stateParams.postId)
					$scope.findOne($stateParams.postId);
				else
					$scope.post = $scope.posts[0];
			}).sort('created');
		};

	$scope.findOne = function(id)
		{
			$scope.post = messageBoardService.get({
				postId: id
			});
		};

	}
]);