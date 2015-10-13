
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified');

class Range extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._start = 0;
        this._end = 0;
        this._orientation = URI();
    }

    set start(start) {
        this._start = start;
    }

    get start() {
        return this._start;
    }

    set end(end) {
        this._end = end;
    }

    get end() {
        return this._end;
    }

    set orientation(orientation) {
        this._orientation = orientation;
    }

    get orientation() {
        return this._orientation;
    }
}

module.exports = Range;


