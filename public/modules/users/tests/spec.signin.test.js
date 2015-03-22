//Login test
describe('Authentication capabilities', function() {
  var loginURL;
  var email = element(by.id('username'));
  var password = element(by.id('password'));
  var loginButton = element(by.id('signinbutton'));
  var error = element(by.binding('error'));

  it('should redirect to the login page if trying to load protected page while not authenticated', function() {
    browser.get('/#!/signin');
    loginURL = browser.getCurrentUrl();

    browser.get('/#!/signin');
    expect(browser.getCurrentUrl()).toEqual(loginURL);
  });

  it('should warn on missing/malformed credentials', function() {
    email.clear();
    password.clear();

    password.sendKeys('testtest');
    loginButton.click();
    expect(error.getText()).toMatch('Missing credentials');

    email.sendKeys('wrongtest');
    loginButton.click();
    expect(error.getText()).toMatch('Unknown user');

    email.sendKeys('test');
    password.clear();
    loginButton.click();
    expect(error.getText()).toMatch('Missing credentials');
  });


  it('should accept a valid email address and password', function() {
    browser.get('/#!/signin');

    email.sendKeys('test');
    password.sendKeys('testtest');
    loginButton.click();
    expect(browser.getCurrentUrl()).not.toEqual(loginURL);
  });

      it('should return to the home page after logout', function() {
    var menuDropdown = element(by.binding('authentication.user.displayName'));
    menuDropdown.click();
    var logoutButton = element(by.id('signoutbutton'));
    logoutButton.click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/');
    browser.get('/#!/signin');

    email.sendKeys('test');
    password.sendKeys('testtest');
    loginButton.click();
  });
});
