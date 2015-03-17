//

describe('Deck management', function()
{
	it('should create a deck', function()
	{
		browser.get('#!/decks/create');
		
		element(by.model('name')).sendKeys('Protractor Deck');
		element(by.model('description')).sendKeys('autogen');

		element(by.id('create_submit')).click();

		expect(element(by.binding('deck.name')).getText()).toEqual('Protractor Deck');
	});
});
