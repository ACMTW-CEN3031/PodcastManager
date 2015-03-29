'use strict';

angular.module('messageBoard').controller('messageController', ['$scope', '$location', 'messageBoardService'
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
			title: this.name,
			content: this.description,
			link: this.link,
			comments: this.description
		});

			post.$save(function(res)
			{
				$location.path('messageBoard/' + res._id);

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
	$scope.getPost = function(idNum){

	}
	$scope.showMessage = function(){
		var post = $scope.getPost(id-1);
		alert(post.title);
		document.getElementById('content').innerHTML = $scope.post.content;
		document.getElementById('title').innerHTML = $scope.post.title;
		document.getElementById('link').innerHTML = $scope.post.link;
	};
	$scope.find = function()
		{
			$scope.posts = messageBoard.query();
		};

	$scope.findOne = function()
		{
			$scope.post = messageBoardService.get({
				postId: $stateParams.postId
			});
		};

	}
]);