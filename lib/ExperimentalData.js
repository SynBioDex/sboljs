
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified'),
    util = require('./util');

class ExperimentalData extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);
    }

}

module.exports = ExperimentalData


