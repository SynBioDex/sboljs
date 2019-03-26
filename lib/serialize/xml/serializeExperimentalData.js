
"use strict";

var xml = require('xml'),
    serializeIdentified = require('./serializeIdentified');

module.exports = function serializeExperimentalData(sbolDocument, xmlAttribsRef, ed) {

    var properties = [];

    return serializeIdentified(sbolDocument, xmlAttribsRef, ed, 'sbol:ExperimentalData', properties);

}


