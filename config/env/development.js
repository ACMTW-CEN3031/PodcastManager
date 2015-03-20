'use strict';

module.exports = {
	db: 'mongodb://admin:cen3031@ds039431.mongolab.com:39431/saw_interface',
	app: {
		title: 'SequentialArtistsWorkshopWebInterface - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '607795356017851',
		clientSecret: process.env.FACEBOOK_SECRET || '67fed15e03d18731414072b270cf875f',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || '88M9PXH3xxPxwJyCgJlr35rcN',
		clientSecret: process.env.TWITTER_SECRET || 'ZGEmTFSK4RyiGv0yVHGuE30cIdMq9eLUHC2JZf4KUf7e3eqFNF',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '255065928936-6pihiqvldbjrv1odkb9g6qg004qkojeu.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || '72e_-heH2A0XT-xKXY_mhnMi',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
