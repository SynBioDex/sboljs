
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

var URI = require('urijs'),
    Identified = require('./Identified'),
    util = require('./util');

/**
 * Class to represent an SBOL2 MapsTo.
 */
class MapsTo extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._refinement = URI();
        this._remote = URI();
        this._local = URI();
    }

    /**
     * Set the refinement property for this MapsTo.
     * @param {string|URI} [refinement]
     */
    set refinement(refinement) {
        this._refinement = URI(refinement);
    }

    /**
     * Retrieve the refinement property for this MapsTo.
     * @returns {URI} - refinement
     */
    get refinement() {
        return this._refinement;
    }

    /**
     * Set the remote component for this MapsTo.
     * @param {string|URI|Component|FunctionalComponent} [remote]
     */
    set remote(remote) {
        this._remote = util.uriOrObject(remote);
    }

    /**
     * Retrieve the remote component for this MapsTo.
     * @returns {URI|Component|FunctionalComponent} [remote]
     */
    get remote() {
        return this._remote;
    }

    /**
     * Set the local component for this MapsTo.
     * @param {string|URI|Component|FunctionalComponent} [local]
     */
    set local(local) {
        this._local = util.uriOrObject(local);
    }

    /**
     * Retrieve the local component for this MapsTo.
     * @returns {URI|Component|FunctionalComponent} [local]
     */
    get local() {
        return this._local;
    }

    /**
     * Attempt to resolve the local and remote components by URI.
     */
    link() {
        this._remote = this._sbolDocument.lookupURI(this._remote);
        this._local = this._sbolDocument.lookupURI(this._local);
    }
}

module.exports = MapsTo;


