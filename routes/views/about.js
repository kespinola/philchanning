/**
 * Created by ksespinola on 4/1/14.
 */
var keystone = require('keystone'),
    async = require('async');

var Page = keystone.list('Page');
var Categories = keystone.list('ClientCategory');
var Testimonials = keystone.list('Testimonial');
var Sections = keystone.list('Section');
var Clients = keystone.list('Client');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    locals.data = {
        testimonials: [],
        categories: []
    };

    // Set locals
    locals.section = 'about';

//Perform view queries
    view.query('categories', Categories.model.find().sort('name'));
    view.query('clients', Clients.model.find().sort('publishedOn'));
    view.query('testimonials', Testimonials.model.find().sort('publishedOn'));
    view.query('sections', Sections.model.find().sort('label'));
    view.query('page',Page.model.findOne().where('slug','about'));

    // Render the view
    view.render('about');
}

