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