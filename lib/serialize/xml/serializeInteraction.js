
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified'),
    serializeParticipation = require('./serializeParticipation');

module.exports = function serializeInteraction(sbolDocument, interaction) {

    var properties = [];

    interaction.types.forEach(function(type) {

        properties.push({
            'sbol:type': {
                _attr: {
                    'rdf:resource': type
                }
            }
        });

    });

    interaction.participations.forEach(function(participation) {
        properties.push({
            'sbol:participation': [
                serializeParticipation(sbolDocument, participation)
            ]
        });
    });

    return serializeIdentified(sbolDocument, interaction, 'sbol:Interaction', properties);
}

