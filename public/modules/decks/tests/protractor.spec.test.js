describe('Deck management', function()
{
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

	it('should delete the deck', function()
	{
		browser.get('#!/decks');

		element.all(by.repeater('deck in decks')).get(0).element(by.id('delete')).click();
		expect(element.all(by.repeater('deck in decks')).get(0)).not.toBe('*Protractor Deck');
	});
});
