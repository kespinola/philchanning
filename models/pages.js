var _ = require('underscore'),
    keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Website Owner Page
 * =====
 */

var Page = new keystone.List('Page', {
    autokey: { path: 'slug', from: 'pagename', unique: true },
    map: {name:'pagename'}
});

Page.add({
    heroImage: { type: Types.CloudinaryImage, collapse:true },
    pagename: { type: Types.Text, required:true},
    profileImage: {type: Types.CloudinaryImage, collapse:true},
    images: {type: Types.CloudinaryImages, collapse:true},
    name: { type: Types.Name, collapse:true},
    tagline: {type: Types.Text,collapse:true},
    sections: {type: Types.Relationship, ref:'Section', many:true},
    testimonials: {type:Types.Relationship, ref:'Testimonial', many:true},
    clients: {type:Types.Relationship, ref:'Client', many:true},
    blurb: {type: Types.Markdown, collapse:true },
    publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true }
});

Page.relationship({ref:'Client', path:'clients'});
Page.relationship({ref:'Testimonials', path:'testimonials'});
Page.relationship({ref:'Section', path:'sections'});




/**
 * Registration
 */

Page.register();