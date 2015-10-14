
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

class ComponentDefinition extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._types = [];
        this._roles = [];
        this._components = [];
        this._sequenceAnnotations = [];
        this._sequenceConstraints = [];
        this._sequences = [];
    }

    addType(type) {
        this._types.push(URI(type));
    }

    addComponent(component) {
        this._components.push(util.uriOrObject(component));
    }

    addRole(role) {
        this._roles.push(URI(role));
    }

    addSequenceAnnotation(sequenceAnnotation) {
        this._sequenceAnnotations.push(util.uriOrObject(sequenceAnnotation));
    }

    addSequenceConstraint(sequenceConstraint) {
        this._sequenceConstraints.push(util.uriOrObject(sequenceConstraint));
    }

    addSequence(sequence) {
        this._sequences.push(util.uriOrObject(sequence));
    }

    get types() {
        return this._types.slice(0);
    }

    get components() {
        return this._components.slice(0);
    }

    get sequenceAnnotations() {
        return this._sequenceAnnotations.slice(0);
    }

    get sequenceConstraints() {
        return this._sequenceConstraints.slice(0);
    }

    get sequences() {
        return this._sequences.slice(0);
    }

    get roles() {
        return this._roles.slice(0);
    }

    link() {

        this._components = this._sbolDocument.lookupURIs(this._components);
        this._sequenceAnnotations = this._sbolDocument.lookupURIs(this._sequenceAnnotations);
        this._sequenceConstraints = this._sbolDocument.lookupURIs(this._sequenceConstraints);
        this._sequences = this._sbolDocument.lookupURIs(this._sequences);
    }
}

module.exports = ComponentDefinition;





