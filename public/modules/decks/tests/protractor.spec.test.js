var getDeckPanel = function()
{
	var panels = element.all(by.repeater('deck in decks'));
	for (var i = 0; i != panels.count(); ++i)
	{
		var panel = panels.get(i);
		if (panel.element(by.binding('deck.name')).getText() == '*Protractor Deck')
			return panel;
	}

	return false;
};

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

	it('should delete the deck', function()
	{
		browser.get('#!/decks');

		element.all(by.repeater('deck in decks')).get(0).element(by.id('delete')).click();
		expect(element.all(by.repeater('deck in decks')).get(0)).not.toBe('*Protractor Deck');
	});
});
