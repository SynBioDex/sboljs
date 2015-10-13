
"use strict";

var xml = require('xml'),
    serializeModuleDefinition = require('./serializeModuleDefinition'),
    serializeCollection = require('./serializeCollection'),
    serializeComponent = require('./serializeComponent'),
    serializeComponentDefinition = require('./serializeComponentDefinition'),
    serializeInteraction = require('./serializeInteraction'),
    serializeModel = require('./serializeModel'),
    serializeSequence = require('./serializeSequence'),
    serializeSequenceAnnotation = require('./serializeSequenceAnnotation');

module.exports = function serializeXML(sbolDocument) {

    var nodes = [
        {
            _attr: {
                'xmlns:rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
                'xmlns:dcterms': 'http://purl.org/dc/terms/',
                'xmlns:prov': 'http://www.w3.org/ns/prov#',
                'xmlns:sbol': 'http://sbols.org/v2#'
            }
        }
    ];

    sbolDocument.moduleDefinitions.forEach(function(moduleDefinition) {
        nodes.push(serializeModuleDefinition(sbolDocument, moduleDefinition));
    });

    sbolDocument.componentDefinitions.forEach(function(componentDefinition) {
        nodes.push(serializeComponentDefinition(sbolDocument, componentDefinition));
    });

    sbolDocument.sequences.forEach(function(sequence) {
        nodes.push(serializeSequence(sbolDocument, sequence));
    });

    return xml({
        'rdf:RDF': nodes
    }, {
        declaration: true,
        indent: '  '
    });
}


