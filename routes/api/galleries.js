/**
 * Created by ksespinola on 5/10/14.
 */
var async = require('async'),
    keystone = require('keystone');

var Gallery = keystone.list('Gallery');

/**
 * List Galleries
 */
exports.list = function(req, res) {

    var query = Gallery.model.find();

    // If a title is provided, use regex to limit matches
    if (req.query.title) {
        query.where('title', new RegExp(keystone.utils.escapeRegExp(req.query.title), 'gi'));
    }

    query.exec(function(err, items) {

        if (err) return res.apiError('database error', err);

        res.apiResponse({
            galleries: items
        });

    });
}

/**
 * Get Gallery by ID
 */
exports.get = function(req, res) {
    Gallery.model.findById(req.params.id).exec(function(err, item) {

        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');

        res.apiResponse({
            gallery: item
        });

    });
}


/**
 * Create a Gallery
 */
exports.create = function(req, res) {

    var item = new Gallery.model(),
        data = (req.method == 'POST') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err) {

        if (err) return res.apiError('error', err);

        res.apiResponse({
            gallery: item
        });

    });
}

/**
 * Get Gallery by ID
 */
exports.update = function(req, res) {
    Gallery.model.findById(req.params.id).exec(function(err, item) {

        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');

        var data = (req.method == 'POST') ? req.body : req.query;

        item.getUpdateHandler(req).process(data, function(err) {

            if (err) return res.apiError('create error', err);

            res.apiResponse({
                gallery: item
            });

        });

    });
}

/**
 * Delete Gallery by ID
 */
exports.remove = function(req, res) {
    Gallery.model.findById(req.params.id).exec(function (err, item) {

        if (err) return res.apiError('database error', err);
        if (!item) return res.apiError('not found');

        item.remove(function (err) {
            if (err) return res.apiError('database error', err);

            return res.apiResponse({
                success: true
            });
        });

    });
}