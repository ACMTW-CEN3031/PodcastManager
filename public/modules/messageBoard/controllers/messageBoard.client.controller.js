'use strict';

angular.module('messageBoard').controller('messageController', ['$scope', '$location',
	function($scope, $location)
	{
	$scope.posts = [

		];
	$scope.addPost = function(){
	  if(!$scope.title || $scope.title === '') { return; }
	  $scope.posts.push({
	    title: $scope.title,
	    link: $scope.link,
	    upvotes: 0
	  });
	  $scope.title = '';
	  $scope.link = '';
	};
	}
]);