
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadComponentDefinition(sbolDocument, componentDefinition, graph, triple) {

    loadIdentified(sbolDocument, componentDefinition, graph, triple);

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#type', (type) => {
        componentDefinition.type = type;
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#role', (role) => {
        componentDefinition.addRole(role);
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#component', (component) => {
        componentDefinition.addComponent(component);
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#sequenceAnnotation', (sequenceAnnotation) => {
        componentDefinition.addSequenceAnnotation(sequenceAnnotation);
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#sequenceConstraint', (sequenceConstraint) => {
        componentDefinition.addSequenceConstraint(sequenceConstraint);
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#sequence', (sequence) => {
        componentDefinition.addSequence(sequence);
    });
}


