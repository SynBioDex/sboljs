
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified');

module.exports = function serializeMeasure(sbolDocument, xmlAttribsRef, measure) {

    var properties = []

    properties.push(
        { 'om:hasNumericalValue': measure.value }
    )

    if(measure.unit.toString() !== '') {
        properties.push({
            'om:hasUnit': { _attr: { 'rdf:resource': measure.unit } }
        })
    }

    measure.types.forEach(function(type) {

        properties.push({
            'sbol:type': {
                _attr: {
                    'rdf:resource': type
                }
            }
        });

    });

    return serializeIdentified(sbolDocument, xmlAttribsRef, measure, 'om:Measure', properties)
}

