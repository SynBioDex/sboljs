
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadRange(sbolDocument, range, graph, triple) {

    loadIdentified(sbolDocument, range, graph, triple);

    util.extractNumericProperties(graph, triple.subject, 'http://sbols.org/v2#start', (start) => {
        range.start = start;
    });

    util.extractNumericProperties(graph, triple.subject, 'http://sbols.org/v2#end', (end) => {
        range.end = end;
    });

    util.extractURIProperties(graph, triple.subject, 'http://sbols.org/v2#orientation', (orientation) => {
        range.orientation = orientation;
    });
}


