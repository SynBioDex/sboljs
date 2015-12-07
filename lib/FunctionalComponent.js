
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
    xml = require('xml'),
    util = require('./util');

/**
 * Class to represent an SBOL2 functional component instantiation.
 *
 * Functional components are instantiations of ComponentDefinitions that
 * live inside ModuleDefinitions.
 */
class FunctionalComponent extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._definition = URI();
        this._access = URI('http://sbols.org/v2#public');
        this._direction = URI('http://sbols.org/v2#inout');
    }

    /**
     * Set the ComponentDefinition for this FunctionalComponent.
     * @param {string|URI|ComponentDefinition} [definition]
     */
    set definition(definition) {
        this._definition = util.uriOrObject(definition);
    }

    /**
     * Retrieve the ComponentDefinition for this FunctionalComponent.  Returns
     * either a URI or a ComponentDefinition, depending on whether the URI has
     * been resolved by link().
     *
     * @returns {URI|ComponentDefinition}
     */
    get definition() {
        return this._definition;
    }

    /**
     * Set the access property for this FunctionalComponent.
     * @param {string|URI} [access]
     */
    set access(access) {
        this._access = URI(access);
    }

    /**
     * Retrieve the access property for this FunctionalComponent.
     * @returns {URI} [access]
     */
    get access() {
        return this._access;
    }

    /**
     * Set the direction property for this FunctionalComponent.
     * @param {string|URI} [direction]
     */
    set direction(direction) {
        this._direction = URI(direction);
    }

    /**
     * Retrieve the direction property for this FunctionalComponent.
     * @returns {URI} [direction]
     */
    get direction() {
        return this._direction;
    }
}

module.exports = FunctionalComponent;


