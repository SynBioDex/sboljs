
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadFunctionalComponent(sbolDocument, functionalComponent, graph, triple) {

    loadIdentified(sbolDocument, functionalComponent, graph, triple);

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#definition', (definition) => {
        functionalComponent.definition = definition;
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#access', (access) => {
        functionalComponent.access = access;
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#direction', (direction) => {
        functionalComponent.direction = direction;
    });

}


