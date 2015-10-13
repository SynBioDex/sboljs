
"use strict";

var URI = require('urijs');

class Identified
{
    constructor(sbolDocument) {

        this._sbolDocument = sbolDocument;
        this._displayId = '';
        this._persistentIdentity = URI();
        this._version = '';
        this._wasDerivedFrom = URI();
        this._name = '';
        this._description = '';
        //this._annotations = [];
    }

    set displayId(displayId) {
        this._displayId = displayId;
    }
    
    get displayId() {
        return this._displayId;
    }

    set version(version) {
        this._version = version;
    }

    get version() {
        return this._version;
    }

    set wasDerivedFrom(wasDerivedFrom) {
        this._wasDerivedFrom = wasDerivedFrom;
    }

    get wasDerivedFrom() {
        return this._wasDerivedFrom;
    }

    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set description(description) {
        this._description = description;
    }

    get description() {
        return this._description;
    }

    set persistentIdentity(persistentIdentity) {
        this._sbolDocument.unmapURI(this._persistentIdentity, this);
        this._persistentIdentity = persistentIdentity;
        this._sbolDocument.mapURI(this._persistentIdentity, this);
    }

    get persistentIdentity() {
        return this._persistentIdentity;
    }

};

module.exports = Identified;




