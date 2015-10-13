
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified');

module.exports = function serializeModel(sbolDocument, model) {

    return serializeIdentified(sbolDocument, model, 'sbol:Model', {
    });
}

