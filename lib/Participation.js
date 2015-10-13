
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified');

class Participation extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._roles = [];
        this._participants = [];
    }

    addRole(role) {
        if(this._roles.indexOf(role) === -1)
            this._roles.push(role);
    }

    get roles() {
        return this._roles.slice(0);
    }

    addParticipant(participant) {
        if(this._participants.indexOf(participant) === -1)
            this._participants.push(participant);
    }

    get participants() {
        return this._participants.slice(0);
    }

    link() {
        this._participants = this._sbolDocument.lookupURIs(this._participants);
    }
}

module.exports = Participation;

