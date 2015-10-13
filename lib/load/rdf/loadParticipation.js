
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadParticipation(sbolDocument, participation, graph, triple) {

    loadIdentified(sbolDocument, participation, graph, triple);

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#role', (role) => {
        participation.addRole(role);
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#participant', (participant) => {
        participation.addParticipant(participant);
    });

}


