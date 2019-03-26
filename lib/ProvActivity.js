
/*
 * Copyright (C) 2017 ICOS Group, Newcastle University.  All rights reserved.
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

var URI = require('urijs'),
    Identified = require('./Identified'),
    xml = require('xml'),
    util = require('./util');

/**
 * Represents a PROV-O Activity as described in 12.8 "Adding Provenance"
 */
class ProvActivity extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._startedAtTime = null
        this._endedAtTime = null
        this._usages = []
        this._associations = []
        this._wasInformedBys = []
        this._types = [];
    }

    addType(type) {
        this._types.push(URI(type));
    }

    get types() {
        return this._types.slice(0);
    }

    set startedAtTime(startedAtTime) {
        this._startedAtTime = startedAtTime ? new Date(startedAtTime) : null
    }

    get startedAtTime() {
        return this._startedAtTime ? new Date(this._startedAtTime) : null
    }

    set endedAtTime(endedAtTime) {
        this._endedAtTime = endedAtTime ? new Date(endedAtTime) : null
    }

    get endedAtTime() {
        return this._endedAtTime ? new Date(this._endedAtTime) : null
    }

    addUsage(usage) {
        this._usages.push(usage)
    }

    get usages() {
        return this._usages.slice(0)
    }

    addAssociation(association) {
        this._associations.push(association)
    }

    get associations() {
        return this._associations.slice(0)
    }
  
    addWasInformedBy(wasInformedBy) {
        this._wasInformedBys.push(wasInformedBy)
    }

    get wasInformedBys() {
        return this._wasInformedBys.slice(0)
    }
    
    link() {
		// Call super link to link members of Top Level (Identified)
		super.link();
		
	this._usages = this._sbolDocument.lookupURIs(this._usages)
	this._associations = this._sbolDocument.lookupURIs(this._associations)
	this._wasInformedBys = this._sbolDocument.lookupURIs(this._wasInformedBys)
    }
}

module.exports = ProvActivity;
