describe('Spread Tests', function()
{
	var decks = element.all(by.repeater('deck in decks'));
	var inSpread = element.all(by.repeater('image in cardsInSpread'));
	


	beforeEach(function(){
		browser.get('#!/generate');
	});

	it('should add all decks to the spread', function()
	{
		var model = inSpread.evaluate('cardsInSpread');
		decks.each(function(deck, index){
			var toggleOn = deck.element(by.id('toggleOn'));
			var toggleOff = deck.element(by.id('toggleOff'));

			toggleOn.click();

			expect(decks.count()).toEqual(inSpread.count());
		});

	});


});