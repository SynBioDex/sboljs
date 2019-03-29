
"use strict";

var loadIdentified = require('./loadIdentified');
var addAnnotation = require('./addAnnotation');

module.exports = function loadMeasure(sbolDocument, measure, triples) {

    loadIdentified(sbolDocument, measure, triples).forEach((triple) => {

        var predicate = triple.predicate.toString(),
            object = triple.object.toString();

        switch(predicate) {

            case 'http://www.ontology-of-units-of-measure.org/resource/om-2/hasNumericalValue':
                measure.value = parseFloat(object);
                break;

            case 'http://www.ontology-of-units-of-measure.org/resource/om-2/hasUnit':
                measure.unit = object;
                break;

            default:
                addAnnotation(measure, triple.predicate, triple.object)
                break;
        }
    });
}


