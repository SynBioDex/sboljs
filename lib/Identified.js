
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
    util = require('./util');

/**
 * Base class for all Identified SBOL2 objects.
 */
class Identified
{
    constructor(sbolDocument, uri) {

        this._sbolDocument = sbolDocument;
        this._displayId = '';
        this._uri = URI();
        this._persistentIdentity = URI();
        this._version = '';
        this._wasDerivedFrom = URI();
        this._name = '';
        this._description = '';
        this._annotations = [];

        if(uri !== undefined)
            this.uri = uri;
    }

    /**
     * Set the URI of this Identified.
     * @param {string|URI} [uri]
     */
    set uri(uri) {
        this._sbolDocument.unmapURI(this._uri, this);
        this._uri = URI(uri);
        this._sbolDocument.mapURI(this._uri, this);
    }

    /**
     * Retrieve the URI of this Identified.
     * @returns {URI}
     */
    get uri() {
        return this._uri;
    }

    /**
     * Set the display ID of this Identified.
     * @param {string|URI} [displayId]
     */
    set displayId(displayId) {
        this._displayId = displayId;
    }
    
    /**
     * Retrieve the display ID of this Identified.
     * @returns {string}
     */
    get displayId() {
        return this._displayId;
    }

    /**
     * Set the version of this Identified.
     * @param {string|URI} [version]
     */
    set version(version) {
        this._version = version;
    }

    /**
     * Retrieve the version of this Identified.
     * @returns {string}
     */
    get version() {
        return this._version;
    }

    /**
     * Set the wasDerivedFrom property of this Identified.
     * @param {string|URI} [wasDerivedFrom]
     */
    set wasDerivedFrom(wasDerivedFrom) {
        this._wasDerivedFrom = URI(wasDerivedFrom);
    }

    /**
     * Retrieve the wasDerivedFrom property of this Identified.
     * @returns {URI}
     */
    get wasDerivedFrom() {
        return this._wasDerivedFrom;
    }

    /**
     * Set the name of this Identified.
     * @param {string|URI} [name]
     */
    set name(name) {
        this._name = name;
    }

    /**
     * Retrieve the name of this Identified.
     * @returns {string}
     */
    get name() {
        return this._name;
    }

    /**
     * Set the description of this Identified.
     * @param {string|URI} [description]
     */
    set description(description) {
        this._description = description;
    }

    /**
     * Retrieve the description of this Identified.
     * @returns {string}
     */
    get description() {
        return this._description;
    }

    /**
     * Set the persistentIdentity of this Identified.
     * @param {string|URI} [persistentIdentity]
     */
    set persistentIdentity(persistentIdentity) {
        this._persistentIdentity = URI(persistentIdentity);
    }

    /**
     * Retrieve the persistentIdentity of this Identified.
     * @returns {URI}
     */
    get persistentIdentity() {
        return this._persistentIdentity;
    }

    /**
     * Add an annotation to this Identified.
     * @param {string} [name] - The URI of the annotation
     * @param {string} [value] - The annotation value
     */
    addAnnotation(name, value) {
        this._annotations.push({ name: name, value: value });
    }

    /**
     * Retrieve the annotations for this Identified.
     * @returns {Object[]}
     * @property {string} [name] - The URI of the annotation
     * @property {string} [value] - The annotation value
     */
    get annotations() {
        return this._annotations.slice(0);
    }

    /**
     * Retrieve all annotations for a given URI
     * @returns {string[]} - A list of annotation values
     */
    getAnnotations(name) {
        return this._annotations.filter(
            (annotation) => annotation.name === name
        ).map(
            (annotation) => annotation.value
        )
    }

    /**
     * Retrieve the first matching annotation for a given URI.
     * @returns {string} - The annotation value, or undefined.
     */
    getAnnotation(name) {
        return this.getAnnotations(name)[0]
    }
};

module.exports = Identified;




