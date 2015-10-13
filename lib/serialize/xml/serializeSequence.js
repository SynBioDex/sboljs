
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified');

module.exports = function serializeSequence(sbolDocument, sequence) {

    return serializeIdentified(sbolDocument, sequence, 'sbol:Sequence', [
        { 'sbol:elements': sequence.elements },
        { 'sbol:encoding': { _attr: { 'rdf:resource': sequence.encoding }}},
    ]);
}

