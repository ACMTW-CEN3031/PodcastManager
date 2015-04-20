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

	it('Removes a post', function(messageBoardService)
	{
		var post = new messageBoardService({ _id: '525a8422f6d0f87f0e407a33', title: 'Test', content: 'testContent', userName: 'testUser'});
		scope.posts = [post];

		scope.deletePost(post);
		expect(scope.posts.length).toBe(0);
	});

	it('Adds a comment', function(messageBoardService)
	{
		var post = new messageBoardService({ _id: '525a8422f6d0f87f0e407a33', title: 'Test', content: 'testContent', userName: 'testUser'});

		scope.commentText = 'test comment';
		scope.addComment(post);

		expect(post.comments.length).toBe(1);
		expect(post.comments[0]).toEqual('test comment');
	});

	it('Finds multiple posts in a query', function(messageBoardService)
	{
		var post = new messageBoardService({ _id: '525a8422f6d0f87f0e407a33', title: 'Test', content: 'testContent', userName: 'testUser'});

		scope.find();
		expect(scope.posts).toEqual([post]);
	});

	it('Finds a single post based on ID', function(messageBoardService)
	{
		var post = new messageBoardService({ _id: '525a8422f6d0f87f0e407a33', title: 'Test', content: 'testContent', userName: 'testUser'});
		$stateParams.postId = post._id;
		scope.findOne();
		expect(scope.post).toEqual(post);
	});
});