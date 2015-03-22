describe('Spread Tests', function()
{
	var decks = element.all(by.repeater('deck in decks'));
	var inSpread = element.all(by.repeater('image in cardsInSpread'));
	


	beforeEach(function(){
		browser.get('#!/generate');
	});

	it('should add all decks to the spread', function()
	{
		decks.each(function(deck, index){
			var toggleOn = deck.element(by.id('toggleOn'));

			toggleOn.click();

			expect(decks.count()).toEqual(inSpread.count());
		});

	});

	it('should add then remove all decks from the spread', function(){
		decks.each(function(deck, index){
			var toggleOn = deck.element(by.id('toggleOn'));

			toggleOn.click();


		});
		expect(inSpread.count()).toEqual(decks.count());

		decks.each(function(deck, index){
			var toggleOff = deck.element(by.id('toggleOff'));

			toggleOff.click();

			
		});
		browser.waitForAngular();
		expect(inSpread.count()).toEqual(0);

	});

});