
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
 * Represents a PROV-O Usage as described in 12.8 "Adding Provenance"
 */
class ProvUsage extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._entity = new URI()
        this._roles = []
    }

    set entity(entity) {
        this._entity = new URI(entity)
    }

    get entity() {
        return this._entity
    }

    /**
     * Assign a role to this Usage.
     * @param {string|URI} [role]
     */
    addRole(role) {
        this._roles.push(URI(role));
    }

     /**
     * Retrieve the list of roles assigned to this Usage.
     * @returns {URI[]}
     */
    get roles() {
        return this._roles.slice(0);
    }

    link() {
		this._entity = this._sbolDocument.lookupURI(this._entity);
    }
}

module.exports = ProvUsage;
