var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

var admins = [
	{ email: 'philchanning@cox.net', password: 'philchanning', name: { first: 'Phil', last: 'Channing' } },
    { email: 'ksespinola@gmail.com', password: 'pw', name: { first: 'Kyle', last: 'Espinola' } }
];

function createAdmin(admin, done) {
	
	var newAdmin = new User.model(admin);
	
	newAdmin.isAdmin = true;
	newAdmin.save(function(err) {
		if (err) {
			console.error("Error adding admin " + admin.email + " to the database:");
			console.error(err);
		} else {
			console.log("Added admin " + admin.email + " to the database.");
		}
		done();
	});
	
}

exports = module.exports = function(done) {
	async.forEach(admins, createAdmin, done);
};
