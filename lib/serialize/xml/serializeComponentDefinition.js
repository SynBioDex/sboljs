
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
    serializeIdentified = require('./serializeIdentified'),
    serializeComponent = require('./serializeComponent'),
    serializeSequenceAnnotation = require('./serializeSequenceAnnotation'),
    serializeSequenceConstraint = require('./serializeSequenceConstraint');

module.exports = function serializeComponentDefinition(sbolDocument, xmlAttribs, componentDefinition) {

    var properties = [];

    componentDefinition.types.forEach(function(type) {
        properties.push({ 'sbol:type': { _attr: { 'rdf:resource': type }}});
    });

    componentDefinition.roles.forEach(function(role) {
        properties.push({ 'sbol:role': { _attr: { 'rdf:resource': role }}});
    });

    componentDefinition.components.forEach(function(component) {
        properties.push({
            'sbol:component': [
                serializeComponent(sbolDocument, xmlAttribs, component)
            ]
        });
    });

    componentDefinition.sequenceAnnotations.forEach(function(sequenceAnnotation) {
        properties.push({
            'sbol:sequenceAnnotation': [
                serializeSequenceAnnotation(sbolDocument, xmlAttribs, sequenceAnnotation)
            ]
        });
    });

    componentDefinition.sequenceConstraints.forEach(function(sequenceConstraint) {
        properties.push({
            'sbol:sequenceConstraint': [
                serializeSequenceConstraint(sbolDocument, xmlAttribs, sequenceConstraint)
            ]
        });
    });

    componentDefinition.sequences.forEach(function(sequence) {
        properties.push({ 'sbol:sequence': { _attr: { 'rdf:resource': sequence.uri }}});
    });

    return serializeIdentified(sbolDocument, xmlAttribs, componentDefinition, 'sbol:ComponentDefinition', properties);
}

