
"use strict";

var util = require('./rdfUtil');

module.exports = function loadIdentified(sbolDocument, identified, graph, triple) {

    util.extractStringProperties(graph, triple.subject, 'http://sbols.org/v2#displayId', (displayId) => {
        identified.displayId = displayId;
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#persistentIdentity', (persistentIdentity) => {
        identified.persistentIdentity = persistentIdentity;
    });

    util.extractStringProperties(graph, triple.subject, 'http://sbols.org/v2#version', (version) => {
        identified.version = version;
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#wasDerivedFrom', (wasDerivedFrom) => {
        identified.wasDerivedFrom = wasDerivedFrom;
    });

    util.extractStringProperties(graph, triple.subject, 'http://purl.org/dc/terms/title', (name) => {
        identified.name = name;
    });

    util.extractStringProperties(graph, triple.subject, 'http://purl.org/dc/terms/description', (description) => {
        identified.description = description;
    });

}


