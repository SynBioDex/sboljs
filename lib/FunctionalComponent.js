
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified'),
    xml = require('xml');

class FunctionalComponent extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._definition = URI();
        this._access = URI('http://sbols.org/v2#public');
        this._direction = URI('http://sbols.org/v2#inout');
    }

    set definition(definition) {
        this._definition = definition;
    }

    get definition() {
        return this._definition;
    }

    set access(access) {
        this._access = access;
    }

    get access() {
        return this._access;
    }

    set direction(direction) {
        this._direction = direction;
    }

    get direction() {
        return this._direction;
    }
}

module.exports = FunctionalComponent;


