
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

//Users test
describe('Users capabilities', function() {
	var roles = element.all(by.repeater('role in roles'));

	it('should add a user after a user signs up', function()
	{
		var email = element(by.id('username'));
	  var password = element(by.id('password'));
	  var loginButton = element(by.id('signinbutton'));
		var menuDropdown = element(by.binding('authentication.user.displayName'));
	    menuDropdown.click();
	    var logoutButton = element(by.id('signoutbutton'));
	    logoutButton.click();
	    
		browser.get('#!/signup');
		element(by.model('credentials.firstName')).sendKeys('0');
		element(by.model('credentials.lastName')).sendKeys('0');
		element(by.model('credentials.email')).sendKeys(exports.getRandomEmail());
		element(by.model('credentials.username')).sendKeys(exports.getRandomString(8));
		element(by.model('credentials.password')).sendKeys(exports.getRandomString(10));

		element(by.id('signin_submit')).click();

		browser.get('/#!/signin');

    	email.sendKeys('testtest');
    	password.sendKeys('testtest');
    	loginButton.click();

		browser.waitForAngular();
		browser.get('#!/manage');

		expect(element(by.binding('mUser.displayName')).getText()).toEqual('0 0');

	});

	it('should list the correct role for that user', function() {
		browser.get('#!/manage');

		expect(element(by.binding('mUser.roles[0]')).getText()).toEqual('user');

	});

	// it('should change the role of the user if told to', function() {
	// 	browser.get('#!/manage');
		

	// 	element(by.model('selectedRole')).click();
	// 	element.all(by.repeater('role in roles')).get(2).click();
	// 	element(by.id('changeBtn')).click();

	// 	browser.waitForAngular();
	// 	expect(element(by.binding('mUser.roles[0]')).getText()).toEqual('admin');
	// });

	it('should delete the user', function() {
		browser.get('#!/manage');

		element(by.id('delete')).click();

		expect(element(by.binding('mUser.displayName')).getText()).not.toEqual('0 0');

	});

});