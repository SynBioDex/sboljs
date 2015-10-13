
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified');

class Model extends Identified
{
    constructor(sbolDocument) {
        super(sbolDocument);
    }
}

module.exports = Model;

