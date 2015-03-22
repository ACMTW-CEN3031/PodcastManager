//Edit Profile test
describe('Edit Profile capabilities', function() {
  var email = element(by.id('email'));
  var firstName = element(by.id('firstName'));
  var lastName = element(by.id('lastName'));
  var username = element(by.id('username'));
  var saveProfile = element(by.id('saveProfileButton'));
  var success = element(by.id('successMessage'));
  var error = element(by.binding('error'));

  

  it('should warn on missing inputs', function() {
    var menuDropdown = element(by.binding('authentication.user.displayName'));
    menuDropdown.click();
    var editProf = element(by.id('editProf'));
    editProf.click(); 

    firstName.clear();
    lastName.clear();
    username.clear();
    email.clear();

    lastName.sendKeys('testLastName');
    email.sendKeys('cen3031@ufl.edu');
    username.sendKeys('testUsername');
    saveProfile.click();
    expect(error.getText()).toMatch('Please fill in your first name');

    firstName.sendKeys('testFirstName');
    lastName.clear();
    saveProfile.click();
    expect(error.getText()).toMatch('Please fill in your last name');

    lastName.sendKeys('testLastName');
    email.clear();
    saveProfile.click();
    expect(error.getText()).toMatch('Please fill in your email');

    email.sendKeys('cen3031@ufl.edu');
    username.clear();
    saveProfile.click();
    expect(error.getText()).toMatch('Please fill in a username');
  });

  // it('should not allow save profile with invalid email format', function() {
  //   email.clear();
  //   email.sendKeys('cen3031');
  //   saveProfile.click();
  //   expect(element(by.binding('success'))).toEqual(null);
  // });

  // it('should return to the login page after logout', function() {
  //   var menuDropdown = element(by.binding('authentication.user.displayName'));
  //   menuDropdown.click();
  //   var logoutButton = element(by.id('signoutbutton'));
  //   logoutButton.click();
  //   expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/');
  // });
});