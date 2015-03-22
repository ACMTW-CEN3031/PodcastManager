'use strict';
var app = angular.module('messageBoard', ['ui.router']);

app.factory('posts', [function(){
  var o = {
    posts: [];
  };
  return o;
}]);

app.controller('MainCtrl', [
'$scope',
'posts'
function($scope){
  $scope.posts = posts.posts;

}]);
