
"use strict";

var loadIdentified = require('./loadIdentified');
var addAnnotation = require('./addAnnotation');

module.exports = function loadExperiment(sbolDocument, ex, triples) {

    loadIdentified(sbolDocument, ex, triples).forEach((triple) => {

        var predicate = triple.predicate.toString(),
            object = triple.object.toString();

        switch(predicate) {

            case 'http://sbols.org/v2#experimentalData':
                ex.addExperimentalData(object);
                break;

            default:
                addAnnotation(ex, triple.predicate, triple.object)
                break;
        }
    });

}


