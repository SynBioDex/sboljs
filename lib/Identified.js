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

const compareMavenVersions = require('./compareMavenVersions')

/**
 * Base class for all Identified SBOL2 objects.
 */
class Identified {
    constructor(sbolDocument, uri) {

        this._sbolDocument = sbolDocument;
        this._displayId = '';
        this._uri = URI('');
        this._persistentIdentity = URI('');
        this._version = '';
        this._wasDerivedFroms = [];
        this._wasGeneratedBys = [];
        this._name = '';
        this._description = '';
        this._annotations = [];
		this._attachments = [];

        if (uri !== undefined)
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
        
        if (this._persistentIdentity && this._persistentIdentity != '') {
            
            var oldObject = this._sbolDocument.lookupURI(this._persistentIdentity);
            
            if (oldObject.version) {
                if (compareMavenVersions(this._version, oldObject.version) > 0) {
                    this._sbolDocument.mapURI(this._persistentIdentity, this);
                }
            } else {
                this._sbolDocument.mapURI(this._persistentIdentity, this);
            }
        }
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
	 * Kept this method for backwards compatibility.
	 * This method is deprecated and will be removed in a future release.
     * @param {string|URI} [wasDerivedFrom]
     */
    set wasDerivedFrom(wasDerivedFrom) {
		// In js, whether or not the _wasDerivedFroms array has length 0, this will set the first element
        this._wasDerivedFroms[0] = URI(wasDerivedFrom);
    }

    /**
     * Retrieve the wasDerivedFrom property of this Identified.
	 * Kept this method for backwards compatibility.
	 * This method is deprecated and will be removed in a future release.
     * @returns {URI}
     */
    get wasDerivedFrom() {
		if (this._wasDerivedFroms.length > 0) {
			return this._wasDerivedFroms[0];
		}
		return URI('');
    }

	addWasDerivedFrom(wasDerivedFrom) {
		this._wasDerivedFroms.push(URI(wasDerivedFrom));
	}
		

	get wasDerivedFroms() {
		return this._wasDerivedFroms.slice();
	}

    /**
     * Set the wasGeneratedBy property of this Identified.
	 * Kept this method for backwards compatibility.
	 * This method is deprecated and will be removed in a future release.
     * @param {string|URI} [wasGeneratedBy]
     */
    set wasGeneratedBy(wasGeneratedBy) {
        this._wasGeneratedBys[0] = URI(wasGeneratedBy);
    }

    /**
     * Retrieve the wasGeneratedBy property of this Identified.
     * @returns {URI}
     */
    get wasGeneratedBy() {
		if (this._wasGeneratedBys.length > 0) {
			return this._wasGeneratedBys[0];
		}
        return URI('');
    }

	addWasGeneratedBy(wasGeneratedBy) {
		this._wasGeneratedBys.push(URI(wasGeneratedBy));
	}
		

	get wasGeneratedBys() {
		return this._wasGeneratedBys.slice();
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
        var oldObject = this._sbolDocument.lookupURI(persistentIdentity);

        if (oldObject.version) {
            if (this._version && compareMavenVersions(this._version, oldObject.version) > 0) {
                this._sbolDocument.unmapURI(this._persistentIdentity, this);
                this._persistentIdentity = URI(persistentIdentity);
                this._sbolDocument.mapURI(this._persistentIdentity, this);
            } else {
                this._sbolDocument.unmapURI(this._persistentIdentity, this);
                this._persistentIdentity = URI(persistentIdentity);
            }
        } else {
            this._sbolDocument.unmapURI(this._persistentIdentity, this);
            this._persistentIdentity = URI(persistentIdentity);
            this._sbolDocument.mapURI(this._persistentIdentity, this);
        }
    }

    /**
     * Retrieve the persistentIdentity of this Identified.
     * @returns {URI}
     */
    get persistentIdentity() {
        return this._persistentIdentity;
    }

    /**
     * Add a string annotation to this Identified.
     * @param {string} [name] - The URI of the annotation
     * @param {string} [value] - The annotation value
     */
    addStringAnnotation(name, value) {
        this._annotations.push({
            type: 'string',
            name: name,
            value: value
        });
    }

    /**
     * Add a URI annotation to this Identified.
     * @param {string} [name] - The URI of the annotation
     * @param {string} [value] - The annotation value
     */
    addUriAnnotation(name, value) {
        this._annotations.push({
            type: 'uri',
            name: name,
            value: value
        });

        if (name !== 'http://wiki.synbiohub.org/wiki/Terms/synbiohub#rootCollection' &&
            name !== 'http://wiki.synbiohub.org/wiki/Terms/synbiohub#isMemberOf')
            this._sbolDocument.lookupURI(value)
    }

    /**
     * Add a Date annotation to this Identified.
     * @param {string} [name] - The URI of the annotation
     * @param {Date} [value] - The annotation value
     */
    addDateAnnotation(name, value) {
        this._annotations.push({
            type: 'date',
            name: name,
            value: value
        });
    }

    /**
     * Add a HTML annotation to this Identified.
     * @param {string} [name] - The URI of the annotation
     * @param {string} [value] - The annotation value
     */
    addHtmlAnnotation(name, value) {
        this._annotations.push({
            type: 'html',
            name: name,
            value: value
        });
    }

    /**
     * Retrieve the annotations for this Identified.
     * @returns {Object[]}
     * @property {string} [type] - The type of the annotation (string or uri)
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

	/**
	 * Adds the given attachment
     * @param {URI} - The URI of the attachment.
     */
	addAttachment(value) {
		this._attachments.push(util.uriOrObject(value));
	}

	/**
	 * Returns all the attachments for this object
	 * @returns {Attachment[]} - An array of attachments
	 */
	get attachments () {
		return this._attachments.slice();
	}

	/**
	 * Links the members of Top Level (Identified)
	 */
	link () {
	    this._attachments = this._sbolDocument.lookupURIs(this._attachments);
	    this._wasGeneratedBys = this._sbolDocument.lookupURIs(this._wasGeneratedBys);
	}
};

module.exports = Identified;
