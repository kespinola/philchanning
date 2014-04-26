/**
 * Created by ksespinola on 4/1/14.
 */
var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var locals = res.locals,
        view = new keystone.View(req, res);

    // Set locals
    locals.section = 'about';

    // Render the view
    view.render('about');

}