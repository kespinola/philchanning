var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key' }
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	heroImage: { type: Types.CloudinaryImage },
    shortBlurb:{type: Types.Text},
	images: { type: Types.CloudinaryImages },
    blurb: {Type: Types.Markdown}
});

Gallery.register();
