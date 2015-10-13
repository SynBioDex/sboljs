
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadSequenceAnnotation(sbolDocument, sequenceAnnotation, graph, triple) {

    loadIdentified(sbolDocument, sequenceAnnotation, graph, triple);

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#location', (location) => {
        sequenceAnnotation.addLocation(location);
    });
        
    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#component', (component) => {
        sequenceAnnotation.component = component;
    });
}


