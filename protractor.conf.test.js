//

exports.config =
{
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['public/modules/users/tests/authentication.signup.spec.test.js', 'public/modules/users/tests/spec.signin.test.js','public/modules/users/tests/spec.editprofile.test.js','public/modules/decks/tests/generate.spread.spec.test.js','public/modules/decks/tests/protractor.spec.test.js'],
	
	baseUrl: 'http://localhost:3000/'
}

//