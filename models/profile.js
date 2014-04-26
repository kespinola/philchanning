var _ = require('underscore'),
    keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Website Owner Profile
 * =====
 */

var Profile = new keystone.List('Profile');

Profile.add({
    name: { type: Types.Name},
    bio: {type: Types.Textarea},
    pic: {type: Types.CloudinaryImage},
    tagline: {type: Types.Text},
    email: {type: Types.Email}
});




/**
 * Registration
 */

Profile.register();