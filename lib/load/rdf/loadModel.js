
"use strict";

var util = require('./rdfUtil'),
    loadIdentified = require('./loadIdentified');

module.exports = function loadModel(sbolDocument, model, graph, triple) {

    loadIdentified(sbolDocument, model, graph, triple);

}


