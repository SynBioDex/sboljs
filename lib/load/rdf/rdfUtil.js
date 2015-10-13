
"use strict";

var URI = require('urijs');

module.exports = {
    mapTriples: mapTriples,
    extractStringProperties: extractStringProperties,
    extractURIProperties: extractURIProperties,
    extractNumericProperties: extractNumericProperties
};

function mapTriples(graph, triples, fn) {

    return triples.toArray().map(function(triple) {
        return fn(graph, triple);
    });
}

function extractStringProperties(graph, subject, property, callback) {

    var triples = graph.match(subject, property, null).toArray();

    triples.forEach(function(triple) {
        callback(triple.object.toString());
    });
}

function extractURIProperties(graph, subject, property, callback) {

    extractStringProperties(graph, subject, property, function(stringProperty) {

        callback(URI(stringProperty));

    });
}

function extractNumericProperties(graph, subject, property, callback) {

    extractStringProperties(graph, subject, property, function(stringProperty) {

        callback(parseInt(stringProperty));

    });
}





