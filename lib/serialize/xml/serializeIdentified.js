
"use strict";

var extend = require('extend');

module.exports = function serializeIdentified(sbolDocument, identified, tagName, properties) {

    var tags = [];

    if(identified.persistentIdentity.toString() !== '') {
        tags.push({ _attr: { 'rdf:about': identified.persistentIdentity }},
                  { 'sbol:persistentIdentity': { _attr: { 'rdf:resource': identified.persistentIdentity }}});
    }

    if(identified.displayId.toString() !== '')
        tags.push({ 'sbol:displayId': identified.displayId });

    if(identified.version.toString() !== '')
        tags.push({ 'sbol:version': identified.version });

    if(identified.wasDerivedFrom.toString() !== '')
        tags.push({ 'sbol:wasDerivedFrom': identified.wasDerivedFrom });

    if(identified.name.toString() !== '')
        tags.push({ 'dcterms:title': identified.name });

    if(identified.description.toString() !== '')
        tags.push({ 'dcterms:description': identified.description });

    return {
        [tagName]: tags.concat(properties)
    };
}


