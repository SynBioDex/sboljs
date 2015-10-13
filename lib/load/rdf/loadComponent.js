
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadComponent(sbolDocument, component, graph, triple) {

    loadIdentified(sbolDocument, component, graph, triple);

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#definition', (definition) => {
        component.definition = definition;
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#access', (access) => {
        component.access = access;
    });
}


