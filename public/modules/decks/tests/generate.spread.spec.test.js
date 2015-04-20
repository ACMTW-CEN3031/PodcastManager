describe('Spread Tests', function()
{
	var inSpread = element.all(by.repeater('image in cardsInSpread'));
	var toggleOn = element(by.id('toggleOn'));
	var inputNum = element(by.model('deck.cardCount'));
	var refresh = element(by.id('refresh'));

	beforeEach(function(){
		browser.get('#!/generate');
	});

	it('should add a deck to the spread', function()
	{
			
			toggleOn.click();

			inputNum.sendKeys(1);

			refresh.click();
		

			expect(inSpread.count()).toEqual(1);
	});

	it('should add then remove a deck from the spread', function(){

			toggleOn.click();
			inputNum.sendKeys(1);
			refresh.click();


		expect(inSpread.count()).toEqual(1);

			var toggleOff = element(by.id('toggleOff'));

			toggleOff.click();

		browser.waitForAngular();
		expect(inSpread.count()).toEqual(0);

	});

});