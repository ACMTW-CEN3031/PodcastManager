//

exports.config =
{
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['public/modules/users/tests/authentication.signup.spec.test.js'],

	baseUrl: 'http://localhost:3000/'
}

//, 'public/modules/users/tests/spec.signin.test.js','public/modules/decks/tests/protractor.spec.test.js'