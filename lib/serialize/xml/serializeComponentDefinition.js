
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified'),
    serializeComponent = require('./serializeComponent'),
    serializeSequenceAnnotation = require('./serializeSequenceAnnotation'),
    serializeSequenceConstraint = require('./serializeSequenceConstraint');

module.exports = function serializeComponentDefinition(sbolDocument, componentDefinition) {

    var properties = [];

    componentDefinition.types.forEach(function(type) {
        properties.push({ 'sbol:type': { _attr: { 'rdf:resource': type }}});
    });

    componentDefinition.roles.forEach(function(role) {
        properties.push({ 'sbol:role': { _attr: { 'rdf:resource': role }}});
    });

    componentDefinition.components.forEach(function(component) {
        properties.push({
            'sbol:component': [
                serializeComponent(sbolDocument, component)
            ]
        });
    });

    componentDefinition.sequenceAnnotations.forEach(function(sequenceAnnotation) {
        properties.push({
            'sbol:sequenceAnnotation': [
                serializeSequenceAnnotation(sbolDocument, sequenceAnnotation)
            ]
        });
    });

    componentDefinition.sequenceConstraints.forEach(function(sequenceConstraint) {
        properties.push({
            'sbol:sequenceConstraint': [
                serializeSequenceConstraint(sbolDocument, sequenceConstraint)
            ]
        });
    });

    componentDefinition.sequences.forEach(function(sequence) {
        properties.push({ 'sbol:sequence': { _attr: { 'rdf:resource': sequence }}});
    });

    return serializeIdentified(sbolDocument, componentDefinition, 'sbol:ComponentDefinition', properties);
}

