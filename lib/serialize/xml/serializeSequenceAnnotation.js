
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified'),
    serializeLocation = require('./serializeLocation');

module.exports = function serializeSequenceAnnotation(sbolDocument, sequenceAnnotation) {

    var properties = [];

    sequenceAnnotation.locations.forEach(function(location) {

        properties.push({
            'sbol:location': [
                serializeLocation(sbolDocument, location)
            ]
        });

    });

    return serializeIdentified(sbolDocument, sequenceAnnotation, 'sbol:SequenceAnnotation', properties);
}

