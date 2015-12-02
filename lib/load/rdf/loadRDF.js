
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

var SBOLDocument = require('../../SBOLDocument'),
    rdf = require('rdf-ext'),
    RdfXmlParser = require('rdf-parser-rdfxml'),
    loadModuleDefinition = require('./loadModuleDefinition'),
    loadModule = require('./loadModule'),
    loadMapping = require('./loadMapping'),
    loadCollection = require('./loadCollection'),
    loadComponent = require('./loadComponent'),
    loadComponentDefinition = require('./loadComponentDefinition'),
    loadFunctionalComponent = require('./loadFunctionalComponent'),
    loadInteraction = require('./loadInteraction'),
    loadModel = require('./loadModel'),
    loadParticipation = require('./loadParticipation'),
    loadRange = require('./loadRange'),
    loadCut = require('./loadCut'),
    loadGenericLocation = require('./loadGenericLocation'),
    loadSequence = require('./loadSequence'),
    loadSequenceAnnotation = require('./loadSequenceAnnotation'),
    loadSequenceConstraint = require('./loadSequenceConstraint');

module.exports = function load(sbolDocument, source, callback) {

    var parser = new RdfXmlParser();

    parser.parse(source, function(err, graph) {

        if(err)
            return callback(err);

        loadRDFGraph(sbolDocument, graph);

        callback(null);
    });
}

function loadRDFGraph(sbolDocument, graph) {

    var a = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';

    graph.match(null, a, 'http://sbols.org/v2#ModuleDefinition').forEach(
        (triple) => loadModuleDefinition(sbolDocument, sbolDocument.moduleDefinition(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Module').forEach(
        (triple) => loadModule(sbolDocument, sbolDocument.module(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#MapsTo').forEach(
        (triple) => loadMapping(sbolDocument, sbolDocument.mapping(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#FunctionalComponent').forEach(
        (triple) => loadFunctionalComponent(sbolDocument, sbolDocument.functionalComponent(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Collection').forEach(
        (triple) => loadCollection(sbolDocument, sbolDocument.collection(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#ComponentDefinition').forEach(
        (triple) => loadComponentDefinition(sbolDocument, sbolDocument.componentDefinition(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Interaction').forEach(
        (triple) => loadInteraction(sbolDocument, sbolDocument.interaction(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Participation').forEach(
        (triple) => loadParticipation(sbolDocument, sbolDocument.participation(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Model').forEach(
        (triple) => loadModel(sbolDocument, sbolDocument.model(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Sequence').forEach(
        (triple) => loadSequence(sbolDocument, sbolDocument.sequence(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Range').forEach(
        (triple) => loadRange(sbolDocument, sbolDocument.range(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Cut').forEach(
        (triple) => loadCut(sbolDocument, sbolDocument.cut(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#GenericLocation').forEach(
        (triple) => loadGenericLocation(sbolDocument, sbolDocument.genericLocation(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#SequenceAnnotation').forEach(
        (triple) => loadSequenceAnnotation(sbolDocument, sbolDocument.sequenceAnnotation(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Component').forEach(
        (triple) => loadComponent(sbolDocument, sbolDocument.component(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#SequenceConstraint').forEach(
        (triple) => loadSequenceConstraint(sbolDocument, sbolDocument.sequenceConstraint(triple.subject.toString()), graph.match(triple.subject))
    );

    sbolDocument.link();

    // generic top levels?
}

