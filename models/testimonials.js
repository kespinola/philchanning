var _ = require('underscore'),
	keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Testimonials
 * =====
 */

var Testimonial = new keystone.List('Testimonial',{
    label: 'Testimonials',
    singular: 'Testimonial'
});


Testimonial.add({
    quote: {type: Types.Text},
    page:{type: Types.Relationship, ref:'Page', index:true},
    name: {type: Types.Name},
    publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true }
});

Testimonial.relationship({ref:'Page', path:'Testimonials'});


/**
 * Registration
 */

Testimonial.defaultColumns = 'title, page';
Testimonial.register();
