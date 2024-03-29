//Load secret keys used in app --> /.env
//More info: https://www.npmjs.org/package/dotenv
require('dotenv')().load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	
	'name': 'Phil Channing Photgraphy',
	'brand': 'Phil Channing Photgraphy',
	
	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	
	'views': 'templates/views',
	'view engine': 'jade',
	
	'auto update': true,
    'env':'production',
	
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'I!A8ov<yV>6$:m<.7rd$wA,cd0MUmfwu$/ladS8K@9//37?h^GhvimGV0G&x6fb8'
	
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users',
    'Content': ['pages', 'sections','clients','testimonials']
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
