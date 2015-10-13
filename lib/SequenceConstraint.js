
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified');

class SequenceConstraint extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._restriction = URI();
        this._subject = URI();
        this._object = URI();
    }

    set restriction(restriction) {
        this._restriction = restriction;
    }

    get restriction() {
        return this._restriction;
    }

    set subject(subject) {
        this._subject = subject;
    }

    get subject() {
        return this._subject;
    }

    set object(object) {
        this._object = object;
    }

    get object() {
        return this._object;
    }

    link() {
    }
}

module.exports = SequenceConstraint;

