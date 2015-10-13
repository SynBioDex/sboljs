
/*
 * Copyright (C) 2015 ICOS Group, Newcastle University.  All rights reserved.
 * Contact:  James Alastair McLaughlin <j.a.mclaughlin@ncl.ac.uk>
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *  
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

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




