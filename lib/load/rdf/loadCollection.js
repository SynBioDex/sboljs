
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadCollection(sbolDocument, collection, graph, triple) {

    loadIdentified(sbolDocument, collection, graph, triple);

}


