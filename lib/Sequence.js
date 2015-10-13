
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified');

class Sequence extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._elements = '';
        this._encoding = URI();
    }

    set elements(elements) {
        this._elements = elements;
    }

    get elements() {
        return this._elements;
    }

    set encoding(encoding) {
        this._encoding = encoding;
    }

    get encoding() {
        return this._encoding;
    }
}

module.exports = Sequence;


