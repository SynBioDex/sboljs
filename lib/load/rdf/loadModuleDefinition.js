
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadModuleDefinition(sbolDocument, moduleDefinition, graph, triple) {

    loadIdentified(sbolDocument, moduleDefinition, graph, triple);

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#role', (role) => {
        moduleDefinition.addRole(role);
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#functionalComponent', (functionalComponent) => {
        moduleDefinition.addFunctionalComponent(functionalComponent);
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#interaction', (interaction) => {
        moduleDefinition.addInteraction(interaction);
    });
}


