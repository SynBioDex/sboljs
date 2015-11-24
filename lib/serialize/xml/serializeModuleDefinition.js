
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
    serializeFunctionalComponent = require('./serializeFunctionalComponent'),
    serializeInteraction = require('./serializeInteraction'),
    serializeModule = require('./serializeModule');

module.exports = function serializeModuleDefinition(sbolDocument, xmlAttribs, moduleDefinition) {

    var properties = [];

    moduleDefinition.roles.forEach(function(role) {

        properties.push({
            'sbol:role': {
                _attr: {
                    'rdf:resource': role
                }
            }
        });

    });

    moduleDefinition.modules.forEach(function(module) {
        properties.push({
            'sbol:module': [
                serializeModule(sbolDocument, xmlAttribs, module)
            ]
        });
    });

    moduleDefinition.functionalComponents.forEach(function(functionalComponent) {
        properties.push({
            'sbol:functionalComponent': [
                serializeFunctionalComponent(sbolDocument, xmlAttribs, functionalComponent)
            ]
        });
    });

    moduleDefinition.interactions.forEach(function(interaction) {
        properties.push({
            'sbol:interaction': [
                serializeInteraction(sbolDocument, xmlAttribs, interaction)
            ]
        });
    });

    return serializeIdentified(sbolDocument, xmlAttribs, moduleDefinition, 'sbol:ModuleDefinition', properties);
}

