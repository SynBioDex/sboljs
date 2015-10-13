
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified'),
    serializeLocation = require('./serializeLocation');

module.exports = function serializeSequenceConstraint(sbolDocument, sequenceConstraint) {

    return serializeIdentified(sbolDocument, sequenceConstraint, 'sbol:SequenceConstraint', [

        { 'sbol:restriction': { _attr: { 'rdf:about': sequenceConstraint.restriction }}},
        { 'sbol:subject': { _attr: { 'rdf:about': sequenceConstraint.subject }}},
        { 'sbol:object': { _attr: { 'rdf:about': sequenceConstraint.object }}}
    ]);
}

