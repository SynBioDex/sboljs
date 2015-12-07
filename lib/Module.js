
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
 * Class to represent an SBOL2 module instantiation.
 */
class Module extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._definition = URI();
        this._mappings = [];
    }

    /**
     * Set the ModuleDefinition for this Module.
     * @param {string|URI|ModuleDefinition} [definition]
     */
    set definition(definition) {
        this._definition = util.uriOrObject(definition);
    }

    /**
     * Retrieve the ModuleDefinition for this Module.  Returns either a
     * URI or a ModuleDefinition, depending on whether the URI has been
     * resolved by link().
     *
     * @returns {URI|ModuleDefinition}
     */
    get definition() {
        return this._definition;
    }

    /**
     * Add a MapsTo to this Module.
     * @param {string|URI|MapsTo} [mapping]
     */
    addMapping(mapping) {
        this._mappings.push(util.uriOrObject(mapping));
    }

    /**
     * Retrieve the list of mappings assigned to this Module.  There may be
     * URIs present in this list if the mapping(s) have not yet been resolved.
     *
     * @returns {MapsTo[]}
     */
    get mappings() {
        return this._mappings.slice(0);
    }

    /**
     * Attempt to resolve the ModuleDefinition and mappings by URI.
     */
    link() {
        this._definition = this._sbolDocument.lookupURI(this._definition);
        this._mappings = this._sbolDocument.lookupURIs(this._mappings);
    }
}

module.exports = Module;


