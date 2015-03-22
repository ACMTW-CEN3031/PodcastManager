'use strict';

angular.module('messageBoard').controller('messageController', ['$scope', '$location',
	function($scope, $location)
	{
	$scope.posts = [];
	$scope.content = '';
	$scope.title = '';
	$scope.link = '';
	var id = 0;
	$scope.addPost = function(){
	  if(!$scope.title || $scope.title === '') { return; }
	  $scope.posts.push({
	    title: $scope.title,
	    content: $scope.content,
	    link: $scope.link,
	    upvotes: 0,
	    id: 0
	  });
	  id++;
	  $scope.content = '';
	  $scope.title = '';
	  $scope.link = '';
	};
	var idNum = 0;
	$scope.getPost = function(idNum){
		idNum=id;
		return posts[idNum];
	}
	$scope.showMessage = function(){
		var post = $scope.getPost(id-1);
		alert(post.title);
		document.getElementById('content').innerHTML = $scope.post.content;
		document.getElementById('title').innerHTML = $scope.post.title;
		document.getElementById('link').innerHTML = $scope.post.link;
	};
	}
]);