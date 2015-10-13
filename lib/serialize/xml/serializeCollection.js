
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified');

module.exports = function serializeCollection(sbolDocument, collection) {

    return serializeIdentified(sbolDocument, collection, 'sbol:Collection', {
    });
}

