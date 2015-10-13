
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified');

class Interaction extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._types = [];
        this._participations = [];
    }

    addType(type) {

        if(this._types.indexOf(type) === -1)
            this._types.push(type);
    }

    get types() {
        return this._types;
    }
    
    addParticipation(participation) {

        if(this._participations.indexOf(participation) === -1)
            this._participations.push(participation);
    }

    get participations() {
        return this._participations;
    }

    link() {
        this._participations = this._sbolDocument.lookupURIs(this._participations);
    }
}

module.exports = Interaction;

