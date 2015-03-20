
exports.getRandomEmail = function(){
		var strValues = "abcdefghijk123456789";
		var strEmail = "";
		for (var i = 0; i < strValues.length; i++) {
			strEmail = strEmail + strValues.charAt(Math.round(strValues.length * Math.random()));
		}

		return strEmail + "@gmail.com";
	};

exports.getRandomString = function (characterLength) {
	    var randomText = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for (var i = 0; i < characterLength; i++)
	        randomText += possible.charAt(Math.floor(Math.random() * possible.length));
	    
	    return randomText;
	};

exports.getRandomNumber = function (numberLength) {
	    var randomNumber = "";
	    var possible = "0123456789";
	    for (var i = 0; i < numberLength; i++)
	        randomNumber += possible.charAt(Math.floor(Math.random() * possible.length));
	    
	    return randomNumber;
	};

describe('Sign up', function()
{
	it('should sign up', function()
	{
		browser.get('#!/signup');

		element(by.model('credentials.firstName')).sendKeys('John');
		element(by.model('credentials.lastName')).sendKeys('Doe');
		element(by.model('credentials.email')).sendKeys(exports.getRandomEmail());
		element(by.model('credentials.username')).sendKeys(exports.getRandomString(8));
		element(by.model('credentials.password')).sendKeys(exports.getRandomString(10));

		element(by.id('signin_submit')).click();

		expect(element(by.binding('authentication.user.displayName')).getText()).toEqual('John Doe');
	});

});
