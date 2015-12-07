
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
 * Class to represent an SBOL2 ComponentDefinition.
 */
class ComponentDefinition extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._types = [];
        this._roles = [];
        this._components = [];
        this._sequenceAnnotations = [];
        this._sequenceConstraints = [];
        this._sequences = [];
    }

    /**
     * Assign a type to this ComponentDefinition.
     * @param {string|URI} [type]
     */
    addType(type) {
        this._types.push(URI(type));
    }

    /**
     * Add a Component to this ComponentDefinition.
     * @param {string|URI|Component} [component]
     */
    addComponent(component) {
        this._components.push(util.uriOrObject(component));
    }

    /**
     * Assign a role to this ComponentDefinition.
     * @param {string|URI} [role]
     */
    addRole(role) {
        this._roles.push(URI(role));
    }

    /**
     * Add a SequenceAnnotation to this ComponentDefinition.
     * @param {string|URI|SequenceAnnotation} [sequenceAnnotation]
     */
    addSequenceAnnotation(sequenceAnnotation) {
        this._sequenceAnnotations.push(util.uriOrObject(sequenceAnnotation));
    }

    /**
     * Add a SequenceConstraint to this ComponentDefinition.
     * @param {string|URI|SequenceConstraint} [sequenceConstraint]
     */
    addSequenceConstraint(sequenceConstraint) {
        this._sequenceConstraints.push(util.uriOrObject(sequenceConstraint));
    }

    /**
     * Add a Sequence to this ComponentDefinition.
     * @param {string|URI|Sequence} [sequence]
     */
    addSequence(sequence) {
        this._sequences.push(util.uriOrObject(sequence));
    }

    /**
     * Retrieve the list of types assigned to this ComponentDefinition.
     * @returns {URI[]}
     */
    get types() {
        return this._types.slice(0);
    }

    /**
     * Retrieve the list of Components for this ComponentDefinition.
     * There may be URIs present in this list if the component(s) have not
     * yet been resolved.
     *
     * @returns {Component[]}
     */
    get components() {
        return this._components.slice(0);
    }

    /**
     * Retrieve the list of SequenceAnnotations for this ComponentDefinition.
     * There may be URIs present in this list if the sequenceAnnotation(s)
     * have not yet been resolved.
     *
     * @returns {SequenceAnnotation[]}
     */
    get sequenceAnnotations() {
        return this._sequenceAnnotations.slice(0);
    }

    /**
     * Retrieve the list of SequenceConstraints for this ComponentDefinition.
     * There may be URIs present in this list if the sequenceConstraint(s)
     * have not yet been resolved.
     *
     * @returns {SequenceConstraint[]}
     */
    get sequenceConstraints() {
        return this._sequenceConstraints.slice(0);
    }

    /**
     * Retrieve the list of Sequences for this ComponentDefinition.
     * There may be URIs present in this list if the sequence(s) have not yet
     * been resolved.
     *
     * @returns {Sequence[]}
     */
    get sequences() {
        return this._sequences.slice(0);
    }

    /**
     * Retrieve the list of roles assigned to this ComponentDefinition.
     * @returns {URI[]}
     */
    get roles() {
        return this._roles.slice(0);
    }

    /**
     * Attempt to resolve the Components, SequenceAnnotations,
     * SequenceConstraints, and Sequences assigned to this ComponentDefinition
     * by URI.
     */
    link() {

        this._components = this._sbolDocument.lookupURIs(this._components);

        this._sequenceAnnotations = this._sbolDocument.lookupURIs(this._sequenceAnnotations).sort(function(a, b) {

            if(a.ranges.length === 0 || b.ranges.length === 0)
                return 0;

            return a.ranges[0].start - b.ranges[0].start;
        });

        this._sequenceConstraints = this._sbolDocument.lookupURIs(this._sequenceConstraints);
        this._sequences = this._sbolDocument.lookupURIs(this._sequences);
    }
}

module.exports = ComponentDefinition;





