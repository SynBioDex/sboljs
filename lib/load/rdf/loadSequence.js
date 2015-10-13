
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadSequence(sbolDocument, sequence, graph, triple) {

    loadIdentified(sbolDocument, sequence, graph, triple);

    util.extractStringProperties(graph, triple.subject, 'http://sbols.org/v2#elements', (elements) => {
        sequence.elements = elements;
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#encoding', (encoding) => {
        sequence.encoding = encoding;
    });
}


