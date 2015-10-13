
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified');

class SequenceAnnotation extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._locations = [];
        this._component = URI();
    }

    addLocation(location) {
        this._locations.push(location);
    }

    set component(component) {
        this._component = component;
    }

    get component() {
        return this._component;
    }

    get locations() {
        return this._locations.slice(0);
    }

    link() {

        this._locations = this._sbolDocument.lookupURIs(this._locations);
        this._component = this._sbolDocument.lookupURI(this._component);
    }
}

module.exports = SequenceAnnotation;


