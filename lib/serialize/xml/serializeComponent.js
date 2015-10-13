
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified');

module.exports = function serializeComponent(sbolDocument, component) {

    return serializeIdentified(sbolDocument, component, 'sbol:Component', [
        { 'sbol:definition': { _attr: { 'rdf:resource': component.definition }}},
        { 'sbol:access': { _attr: { 'rdf:resource': component.access }}}
    ]);
}

