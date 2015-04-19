'use strict';

var should = require('should'),
	mongoose = require('mongoose'),
	MessageBoard = mongoose.model('messageBoard');

var post1, post2;
describe('messageBoard Model unit tests:', function()
{
	beforeEach(function(done)
	{
		post1 = new MessageBoard({
			title: 'post1',
			content: 'content',
			link: 'www.google.com',
			username: 'test',
			comments: ['one', 'two'],
			created: ''
		});
		post2 = new MessageBoard({
			title: 'post2',
			content: 'content2',
			link: 'www.google.com',
			username: 'test2',
			comments: [],
			created: ''
		});
		done();
	});

	describe('Post Creation', function()
	{
		it('should begin with no posts', function(done)
		{
			MessageBoard.find({}, function(err, messageBoard)
			{
				messageBoard.should.have.length(0);
				done();
			});
		});

		it('should be able to save a new post', function(done)
		{
			post1.save(done);
		});

		it('should not allow a post without a title', function(done)
		{
			post1.title = '';
			return post1.save(function(err)
			{
				should.exist(err);
				done();
			});
		});

		it('should not allow a post with no content', function(done)
		{
			post1.content = '';
			return post1.save(function(err)
			{
				should.exist(err);
				done();
			});
		});
	});

	describe('Post Commenting', function()
	{
		it('should begin with no comments', function(done)
		{
			post2.save(function(err)
			{
				post2.comments.should.have.length(0);
				done();
			});
		});

		it('should be able to add a comment', function(done)
		{
			post2.comments.push('Test comment.');
			post2.save(function(err)
			{
				post2.comments.should.have.length(1);
				done();
			});
		});
	});

	describe('Post Deletion', function()
	{
		it('should be able to delete a post', function(done)
		{
			post1.remove(done);
		});
	});

	afterEach(function(done)
	{
		MessageBoard.remove().exec();
		done();
	});
});
