
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
 * Class to represent an SBOL2 SequenceConstraint.
 */
class SequenceConstraint extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._restriction = URI();
        this._subject = URI();
        this._object = URI();
    }

    /**
     * Set the restriction specifier for this SequenceConstraint.
     * @param {string|URI} [restriction]
     */
    set restriction(restriction) {
        this._restriction = URI(restriction);
    }

    /**
     * Retrieve the restriction specifier for this SequenceConstraint.
     * @returns {URI} [restriction]
     */
    get restriction() {
        return this._restriction;
    }

    /**
     * Set the subject Component for this SequenceConstraint.
     * @param {string|URI|Component} [subject]
     */
    set subject(subject) {
        this._subject = util.uriOrObject(subject);
    }

    /**
     * Retrieve the subject Component for this SequenceConstraint.  May return
     * a URI if the subject Component has not yet been resolved.
     *
     * @returns {URI|Component}
     */
    get subject() {
        return this._subject;
    }

    /**
     * Set the object Component for this SequenceConstraint.
     * @param {string|URI|Component} [object]
     */
    set object(object) {
        this._object = util.uriOrObject(object);
    }

    /**
     * Retrieve the object Component for this SequenceConstraint.  May return
     * a URI if the object Component has not yet been resolved.
     *
     * @returns {URI|Component}
     */
    get object() {
        return this._object;
    }

    /* Attempt to resolve the subject and object Components by URI.
     */
    link() {
        this._subject = this._sbolDocument.lookupURI(this._subject);
        this._object = this._sbolDocument.lookupURI(this._object);
    }
}

module.exports = SequenceConstraint;

