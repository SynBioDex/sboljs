
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

var xml = require('xml'),
    extend = require('extend'),
    serializeModuleDefinition = require('./serializeModuleDefinition'),
    serializeCollection = require('./serializeCollection'),
    serializeComponent = require('./serializeComponent'),
    serializeComponentDefinition = require('./serializeComponentDefinition'),
    serializeInteraction = require('./serializeInteraction'),
    serializeModel = require('./serializeModel'),
    serializeSequence = require('./serializeSequence'),
    serializeSequenceAnnotation = require('./serializeSequenceAnnotation');

module.exports = function serializeXML(sbolDocument, attribs) {

    var xmlAttribs = extend({

        'xmlns:rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        'xmlns:dcterms': 'http://purl.org/dc/terms/',
        'xmlns:prov': 'http://www.w3.org/ns/prov#',
        'xmlns:sbol': 'http://sbols.org/v2#'

    }, attribs || {})

    var nodes = [
        {
            _attr: xmlAttribs
        }
    ];

    sbolDocument.moduleDefinitions.forEach(function(moduleDefinition) {
        nodes.push(serializeModuleDefinition(sbolDocument, xmlAttribs, moduleDefinition));
    });

    sbolDocument.componentDefinitions.forEach(function(componentDefinition) {
        nodes.push(serializeComponentDefinition(sbolDocument, xmlAttribs, componentDefinition));
    });

    sbolDocument.models.forEach(function(model) {
        nodes.push(serializeModel(sbolDocument, xmlAttribs, model));
    });

    sbolDocument.sequences.forEach(function(sequence) {
        nodes.push(serializeSequence(sbolDocument, xmlAttribs, sequence));
    });

    return xml({
        'rdf:RDF': nodes
    }, {
        declaration: true,
        indent: '  '
    });
}


