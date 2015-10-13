
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadInteraction(sbolDocument, interaction, graph, triple) {

    loadIdentified(sbolDocument, interaction, graph, triple);

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#type', (type) => {
        interaction.addType(type);
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#participation', (participation) => {
        interaction.addParticipation(participation);
    });
}


