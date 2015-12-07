
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
    util = require('./util'),
    Range = require('./Range');

/**
 * Class to represent an SBOL2 SequenceAnnotation.
 */
class SequenceAnnotation extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._locations = [];
        this._component = URI();
    }

    /**
     * Add a location to this SequenceAnnotation.
     * @param {string|URI|Range|Cut|GenericLocation} [location]
     */
    addLocation(location) {
        this._locations.push(util.uriOrObject(location));
    }

    /**
     * Set the component for this SequenceAnnotation.
     * @param {string|URI|Component} [component]
     */
    set component(component) {
        this._component = util.uriOrObject(component);
    }

    /**
     * Retrieve the component for this SequenceAnnotation.  May return a URI
     * if the Component has not yet been resolved.
     *
     * @returns {URI|Component}
     */
    get component() {
        return this._component;
    }

    /**
     * Retrieve the list of locations assigned to this SequenceAnnotation.
     * There may be URIs present in this list if the location(s) have not yet
     * been resolved.
     *
     * @returns {Location[]}
     */
    get locations() {
        return this._locations.slice(0);
    }

    /**
     * Retrieve the list of range locations assigned to this SequenceAnnotation.
     * @returns {Range[]}
     */
    get ranges() {
        return this._locations.filter(function(location) {
            return location instanceof Range;
        });
    }

    /**
     * Attempt to resolve the location(s) and component by URI.
     */
    link() {

        this._locations = this._sbolDocument.lookupURIs(this._locations);
        this._component = this._sbolDocument.lookupURI(this._component);
    }
}

module.exports = SequenceAnnotation;


