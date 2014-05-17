var _ = require('underscore'),
	keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Client Category
 * =====
 */

var ClientCategory = new keystone.List('ClientCategory',{
    autokey:{from:'name', path:'key', unique:true},
    label: 'Category',
    singular: 'Categories',
    map: {name:'name'}
});


ClientCategory.add({
    name: {type: String, required:true}
});

/**
 * Relationships
 * =============
 */

ClientCategory.relationship({ref:'Client', refPath: 'categories', path:'categories'});



/**
 * Registration
 */

ClientCategory.addPattern('standard meta');
ClientCategory.register();
