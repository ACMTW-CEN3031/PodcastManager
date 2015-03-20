var path = require('path');

describe('Sign up', function()
{
	it('should sign up', function()
	{
		browser.get('#!/signup');

		element(by.model('credentials.firstName')).sendKeys('John');
		element(by.model('credentials.lastName')).sendKeys('Doe');
		element(by.model('credentials.email')).sendKeys('john.doe@gmail.com');
		element(by.model('credentials.username')).sendKeys('jdoe10');
		element()

	});

	it('should create a deck', function()
	{
		browser.get('#!/decks/create');
		
		element(by.model('name')).sendKeys('*Protractor Deck');
		element(by.model('description')).sendKeys('autogen');

		element(by.id('create_submit')).click();

		expect(element(by.binding('deck.name')).getText()).toEqual('*Protractor Deck');
	});

	it('should not be able to create a duplicate deck', function()
	{
		browser.get('#!/decks/create');

		element(by.model('name')).sendKeys('*Protractor Deck');
		element(by.model('description')).sendKeys('autogen');

		element(by.id('create_submit')).click();

		expect(element(by.binding('error')).getText()).toEqual('Name already exists');
	});

	it('should be able to browse the deck images', function()
	{
		browser.get('#!/decks');
		element.all(by.repeater('deck in decks')).get(0).element(by.id('browse')).click();

		expect(element(by.binding('deck.name')).getText()).toEqual('*Protractor Deck');
	});

	it('should be able to edit the deck images', function()
	{
		browser.get('#!/decks');
		element.all(by.repeater('deck in decks')).get(0).element(by.id('edit')).click();

		expect(element(by.binding('deck.name')).getText()).toEqual('Edit *Protractor Deck');
	});

	it('should be able to upload images to the deck', function()
	{
		browser.get('#!/decks');
		element.all(by.repeater('deck in decks')).get(0).element(by.id('edit')).click();

		var form = element(by.id('image_upload'));
		var target = '../../users/img/buttons/github.png';
		var abspath = path.resolve(__dirname, target);

		form.$('input[type="file"]').sendKeys(abspath);
		form.$('.btn').click();

		target = '../../users/img/buttons/twitter.png';
		abspath = path.resolve(__dirname, target);

		form.$('input[type="file"]').sendKeys(abspath);
		form.$('.btn').click();

		expect(element.all(by.repeater('image in deck.images')).count()).toEqual(2);
	});

	it('should be able to delete an uploaded image', function()
	{
		browser.get('#!/decks');
		element.all(by.repeater('deck in decks')).get(0).element(by.id('edit')).click();

		element.all(by.repeater('image in deck.images')).get(0).element(by.id('delete')).click();
		expect(element.all(by.repeater('image in deck.images')).count()).toEqual(1);
	});

	it('should delete the deck', function()
	{
		browser.get('#!/decks');

		element.all(by.repeater('deck in decks')).get(0).element(by.id('delete')).click();
		expect(element.all(by.repeater('deck in decks')).get(0)).not.toBe('*Protractor Deck');
	});
});
