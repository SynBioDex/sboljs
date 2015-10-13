
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified'),
    serializeFunctionalComponent = require('./serializeFunctionalComponent'),
    serializeInteraction = require('./serializeInteraction');

module.exports = function serializeModuleDefinition(sbolDocument, moduleDefinition) {

    var properties = [];

    moduleDefinition.roles.forEach(function(role) {

        properties.push({
            'sbol:role': {
                _attr: {
                    'rdf:resource': role
                }
            }
        });

    });

    moduleDefinition.functionalComponents.forEach(function(functionalComponent) {
        properties.push({
            'sbol:functionalComponent': [
                serializeFunctionalComponent(sbolDocument, functionalComponent)
            ]
        });
    });

    moduleDefinition.interactions.forEach(function(interaction) {
        properties.push({
            'sbol:interaction': [
                serializeInteraction(sbolDocument, interaction)
            ]
        });
    });

    return serializeIdentified(sbolDocument, moduleDefinition, 'sbol:ModuleDefinition', properties);
}

