'use strict';

describe('DeckController', function() {//the controller were testing
  beforeEach(module('decks'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.create', function() {//The function were testing
    it('creates a deck for the user', function() {
      var $scope = {};
      var controller = $controller('DeckController', { $scope: $scope }); 
      var deckLength = $scope.decks.length;
      $scope.create();
      expect($scope.decks.length).toEqual(decklength+1);
    });
  });

  describe('$scope.remove', function() {
    it('removes a deck from the user', function() {
      var $scope = {};
      var controller = $controller('DeckController', { $scope: $scope });
      var deck = $scope.create();
      var deckLength = $scope.decks.length;
      $scope.remove(deck);
      expect($scope.deckLength).toEqual(deckLength-1);
    });
  });

  describe('$scope.uploadImage', function() {
    it('uploads an image to a deck', function() {
      var $scope = {};
      var controller = $controller('DeckController', { $scope: $scope });
      expect($scope.).toEqual('');
    });
  });

  describe('$scope.removeImage', function() {
    it('removes an image from a deck', function() {
      var $scope = {};
      var controller = $controller('DeckController', { $scope: $scope });
      expect($scope.).toEqual('');
    });
  });

  describe('$scope.find', function() {
    it('finds the Deckservice Query', function() {
      var $scope = {};
      var controller = $controller('DeckController', { $scope: $scope });
      expect($scope.).toEqual('');
    });
  });

  describe('$scope.findOne', function() {
    it('uploads an image to a deck', function() {
      var $scope = {};
      var controller = $controller('DeckController', { $scope: $scope });
      expect($scope.).toEqual('');
    });
  });

});