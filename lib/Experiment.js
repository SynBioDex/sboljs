
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified'),
    util = require('./util');

class Experiment extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._experimentalData = []
    }

    addExperimentalData(experimentalData) {
        this._experimentalData.push(util.uriOrObject(experimentalData));
    }

    get experimentalData() {
        return this._experimentalData;
    }

    link() {
        this._experimentalData = this._sbolDocument.lookupURIs(this._experimentalData);
    }
}

module.exports = Experiment;


