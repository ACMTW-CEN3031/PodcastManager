'use strict';

describe('messageController', function()
{
	beforeEach(module(ApplicationConfiguration.applicationModuleName));

	var scope, $stateParams;
	beforeEach(inject(function($rootScope, _$stateParams_)
	{
		scope = $rootScope.$new();
		$stateParams = _$stateParams_;
	}));

	it('Adds a post', function()
	{
		//Total amt posts

		scope.post = new messageBoard({ title: 'Test', content: 'TestContent', userName: 'testUser'});
		expect(scope.post.title).toEqual('Test');
		expect(scope.post.content).toEqual('TestContent');
		expect(scope.post.userName).toEqual('testUser');
		//

	});

	it('Deletes a Post', function(messageBoard)
	{
		//total amt posts

		scope.post = new messageBoard({ title: 'Test', content: 'TestContent', userName: 'testUser'});
		expect(scope.deck.images.length).toEqual(imagesCount-1);
		//
	});

	it('Adds a Comment', function(messageBoard)
	{
		scope.post = new messageBoard({ title: 'Test', content: 'TestContent', userName: 'testUser'});
		var commentLength = scope.post.comments.length;
		var comment = 'comment';
		scope.addComment(comment);
		expect(scope.post.comments.length).toEqual(commentLength+1);
	});

	it('Finds a single post based on ID', function(messageBoard)
	{
		var post = new messageBoard({ _id: '525a8422f6d0f87f0e407a33', title: 'Test', content: 'testContent', userName: 'testUser'});
		$stateParams.postId = post._id;
		scope.findOne();
		expect(scope.post).toEqual(post);
	});

});