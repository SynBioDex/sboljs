
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified');

module.exports = function serializeFunctionalComponent(sbolDocument, functionalComponent) {

    return serializeIdentified(sbolDocument, functionalComponent, 'sbol:FunctionalComponent', [
        { 'sbol:definition': { _attr: { 'rdf:resource': functionalComponent.definition }}},
        { 'sbol:access': { _attr: { 'rdf:resource': functionalComponent.access }}},
        { 'sbol:direction': { _attr: { 'rdf:resource': functionalComponent.direction }}}
    ]);
}

