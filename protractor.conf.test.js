//

exports.config =
{
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['public/modules/decks/tests/protractor.spec.test.js'],

	baseUrl: 'http://localhost:3000/'
}
