var _ = require('underscore'),
	keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Clients
 * =====
 */

var Client = new keystone.List('Client',{
    label: 'Clients',
    singular: 'Client',
    map: {name:'name'},
    defaultSort:'time.start',
    autokey: { path: 'slug', from: 'name', unique: true }
});

var deps = {
    present: {'time.present':false}
};

Client.add({
    name: {type: Types.Text},
    logo: {type: Types.CloudinaryImage},
    location: {type:Types.Location, collapse: true},
    website: {type: Types.Url},
    page:{type: Types.Relationship, ref:'Page', index:true},
    images: {type: Types.CloudinaryImages, collapse: true},
    description:{type: Types.Markdown},
    categories: {type: Types.Relationship, ref:'ClientCategory', many:true},
    publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true }
});

Client.relationship({ref:'Page', path:'Clients'});


/**
 * Registration
 */

Client.defaultColumns = 'label, page';
Client.register();
