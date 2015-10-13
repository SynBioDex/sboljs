
"use strict";

var rdf = require('rdf-ext')(),
    util = require('./rdfUtil'),
    loadModuleDefinition = require('./loadModuleDefinition'),
    loadCollection = require('./loadCollection'),
    loadComponent = require('./loadComponent'),
    loadComponentDefinition = require('./loadComponentDefinition'),
    loadFunctionalComponent = require('./loadFunctionalComponent'),
    loadInteraction = require('./loadInteraction'),
    loadModel = require('./loadModel'),
    loadParticipation = require('./loadParticipation'),
    loadRange = require('./loadRange'),
    loadSequence = require('./loadSequence'),
    loadSequenceAnnotation = require('./loadSequenceAnnotation');

module.exports = function load(source, callback) {

    rdf.parseRdfXml(source, function(res) {

        if(res === null) {

            /* error parsing rdf/xml
             */
            callback(err);
        }

        callback(null, loadRDFGraph(res));
    });
}

function loadRDFGraph(graph) {

    var sbolDocument = new SBOLDocument();

    graph.match(null, null, 'http://sbols.org/v2#ModuleDefinition').forEach(function(triple) {
        loadModuleDefinition(sbolDocument, sbolDocument.moduleDefinition(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#FunctionalComponent').forEach(function(triple) {
        loadFunctionalComponent(sbolDocument, sbolDocument.functionalComponent(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Collection').forEach(function(triple) {
        loadCollection(sbolDocument, sbolDocument.collection(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#ComponentDefinition').forEach(function(triple) {
        loadComponentDefinition(sbolDocument, sbolDocument.componentDefinition(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Interaction').forEach(function(triple) {
        loadInteraction(sbolDocument, sbolDocument.interaction(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Participation').forEach(function(triple) {
        loadParticipation(sbolDocument, sbolDocument.participation(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Model').forEach(function(triple) {
        loadModel(sbolDocument, sbolDocument.model(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Sequence').forEach(function(triple) {
        loadSequence(sbolDocument, sbolDocument.sequence(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Range').forEach(function(triple) {
        loadRange(sbolDocument, sbolDocument.range(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#SequenceAnnotation').forEach(function(triple) {
        loadSequenceAnnotation(sbolDocument, sbolDocument.sequenceAnnotation(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Component').forEach(function(triple) {
        loadComponent(sbolDocument, sbolDocument.component(), graph, triple);
    });

    sbolDocument.link();

    // generic top levels?

    return sbolDocument;
}

