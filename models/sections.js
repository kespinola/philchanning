var _ = require('underscore'),
	keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Sections
 * =====
 */

var Section = new keystone.List('Section',{
    autokey: {slug:'path',from:'label', path:'key', unique:true},
    label: 'Sections',
    singular: 'Section',
    map: {name:'label'}
});

Section.add({
    page: {type:Types.Relationship, initial:true, ref:'Page', index:true},
    author: { type: Types.Relationship, initial: true, ref: 'User', index: true },
    label: {type: Types.Text},
    images: {type: Types.CloudinaryImages},
    icon: {type: Types.CloudinaryImage},
    blurb: {type: Types.Html, wysiwyg: true}

});

Section.relationship({ref:'Page', path:'sections'});


/**
 * Registration
 */

Section.defaultColumns = 'label,page';
Section.register();
