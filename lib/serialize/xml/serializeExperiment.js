
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified');

module.exports = function serializeExperiment(sbolDocument, xmlAttribsRef, experiment) {

    var properties = [];

    experiment.experimentalData.forEach(function(ed) {
        properties.push(
            { 'sbol:experimentalData': { _attr: { 'rdf:resource': ed.uri?ed.uri:ed }}}
        )
    });

    return serializeIdentified(sbolDocument, xmlAttribsRef, experiment, 'sbol:Experiment', properties);

}


