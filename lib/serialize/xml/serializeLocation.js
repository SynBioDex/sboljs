
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified'),
    Range = require('../../Range'),
    Cut = require('../../Cut'),
    GenericLocation = require('../../GenericLocation');

module.exports = function serializeLocation(sbolDocument, location) {

    if(location instanceof Range) {

        var properties = [
            { 'sbol:start': location.start },
            { 'sbol:end': location.end }
        ];

        if(location.orientation.toString() !== '') {
            properties.push({
                'sbol:orientation': {
                    _attr: {
                        'rdf:resource': location.orientation
                    }
                }
            });
        }

        return serializeIdentified(sbolDocument, location, 'sbol:Range', properties);

    } else if(location instanceof Cut) {

        var properties = [{
            'sbol:at': location.at,
        }];

        if(location.orientation.toString() !== '') {
            properties.push({
                'sbol:orientation': {
                    _attr: {
                        'rdf:resource': location.orientation
                    }
                }
            });
        }

        return serializeIdentified(sbolDocument, location, 'sbol:Cut', properties);

    } else if(location instanceof GenericLocation) {

        if(location.orientation.toString() !== '') {
            properties.push({
                'sbol:orientation': {
                    _attr: {
                        'rdf:resource': location.orientation
                    }
                }
            });
        }

        return serializeIdentified(sbolDocument, location, 'sbol:GenericLocation', properties);
    }
}


