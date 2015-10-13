
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified');

module.exports = function serializeParticipation(sbolDocument, participation) {

    var properties = [];

    participation.roles.forEach(function(role) {

        properties.push({
            'sbol:role': {
                _attr: {
                    'rdf:resource': role
                }
            }
        });

    });

    participation.participants.forEach(function(participant) {

        properties.push({
            'sbol:participant': {
                _attr: {
                    'rdf:resource': participant.persistentIdentity
                }
            }
        });

    });

    return serializeIdentified(sbolDocument, participation, 'sbol:Participation', properties);
}

