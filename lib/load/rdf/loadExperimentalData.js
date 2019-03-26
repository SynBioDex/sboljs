
"use strict";

var loadIdentified = require('./loadIdentified');
var addAnnotation = require('./addAnnotation');

module.exports = function loadExperimentalData(sbolDocument, ed, triples) {

    loadIdentified(sbolDocument, ed, triples).forEach((triple) => {

        var predicate = triple.predicate.toString(),
            object = triple.object.toString();

        switch(predicate) {

            default:
                addAnnotation(ed, triple.predicate, triple.object)
                break;
        }
    });

}


