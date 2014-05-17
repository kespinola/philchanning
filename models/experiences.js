var _ = require('underscore'),
	keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Experiences
 * =====
 */

var Experience = new keystone.List('Experience',{
    label: 'Experiences',
    singular: 'Experience',
    map: {name:'title'},
    defaultSort:'time.start'
});

var deps = {
    present: {'time.present':false}
};

Experience.add({
    title: {type: Types.Text, required: true},
    page:{type: Types.Relationship, ref:'Page', index:true},
    organization:{
        logo: {type: Types.CloudinaryImage},
        name: {type: Types.Text},
        location: {type:Types.Location, collapse: true},
        website: {type: Types.Url}
    },
    images: {type: Types.CloudinaryImages, collapse: true},
    icon: {type: Types.CloudinaryImage, collapse: true},
    time: {
        start: {type: Types.Date},
        present: {type: Boolean, label:'Still Pursuing'},
        end: {type: Types.Date, dependsOn: deps.present}
    },
    description:{type: Types.Markdown},
    publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true }
});

Experience.relationship({ref:'Page', path:'experiences'});


/**
 * Registration
 */

Experience.defaultColumns = 'label, page';
Experience.register();
