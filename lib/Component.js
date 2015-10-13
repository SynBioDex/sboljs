
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified');

class Component extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._definition = URI();
        this._access = URI('http://sbols.org/v2#public');
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
}

module.exports = Component;


