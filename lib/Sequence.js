
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
 * Class to represent an SBOL2 Sequence.
 */
class Sequence extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._elements = '';
        this._encoding = URI();
    }

    /**
     * Set the sequence elements for this sequence.
     *
     * The format of the elements is dependent on the encoding.  For example,
     * if this is a nucleotide sequence, the elements should be a string of
     * nucleotide base pairs.
     *
     * @param {string} [elements]
     */
    set elements(elements) {
        this._elements = elements;
    }

    /**
     * Retrieve the sequence elements for this sequence.
     * @returns {string} [elements]
     */
    get elements() {
        return this._elements;
    }

    /**
     * Set the sequence encoding for this sequence.
     * @param {string|URI} [encoding]
     */
    set encoding(encoding) {
        this._encoding = URI(encoding);
    }

    /**
     * Retrieve the sequence encoding for this sequence.
     * @returns {URI} [encoding]
     */
    get encoding() {
        return this._encoding;
    }
}

module.exports = Sequence;


