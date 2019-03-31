
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
    serializeLocation = require('./serializeLocation'),
    serializeMeasure = require('./serializeMeasure'),
    serializeMapping = require('./serializeMapping');

module.exports = function serializeComponent(sbolDocument, xmlAttribsRef, component) {

    var properties = [
        { 'sbol:definition': { _attr: { 'rdf:resource': component.definition.uri?component.definition.uri:component.definition }}},
        { 'sbol:access': { _attr: { 'rdf:resource': component.access }}},
    ]


    if(component.roleIntegration.toString() !== '') {
        properties.push(
            { 'sbol:roleIntegration': { _attr: { 'rdf:resource': component.roleIntegration }}}
        )
    }

  component.locations.forEach(function(location) {

    properties.push({
      'sbol:location': [
        serializeLocation(sbolDocument, xmlAttribsRef, location)
      ]
    });

  });

  component.sourceLocations.forEach(function(location) {

    properties.push({
      'sbol:sourceLocation': [
        serializeLocation(sbolDocument, xmlAttribsRef, location)
      ]
    });

  });

    component.roles.forEach(function(role) {
        properties.push({ 'sbol:role': { _attr: { 'rdf:resource': role }}});
    });

    component.mappings.forEach(function(mapping) {
        properties.push({
            'sbol:mapsTo': [
                serializeMapping(sbolDocument, xmlAttribsRef, mapping)
            ]
        });
    });

    component.measures.forEach(function(measure) {
        properties.push({
            'sbol:measure': [
                serializeMeasure(sbolDocument, xmlAttribsRef, measure)
            ]
        });
    });

    return serializeIdentified(sbolDocument, xmlAttribsRef, component, 'sbol:Component', properties);

}

