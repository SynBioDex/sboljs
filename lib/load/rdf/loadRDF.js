
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
    rdf = require('rdf-ext')(),
    util = require('./rdfUtil'),
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
    loadSequence = require('./loadSequence'),
    loadSequenceAnnotation = require('./loadSequenceAnnotation'),
    loadSequenceConstraint = require('./loadSequenceConstraint');

module.exports = function load(source, callback) {

    rdf.parseRdfXml(source, function(res) {

        if(res === null) {

            /* error parsing rdf/xml
             */
            callback(err);
        }

        callback(null, loadRDFGraph(res));
    });
}

function loadRDFGraph(graph) {

    var sbolDocument = new SBOLDocument();

    graph.match(null, null, 'http://sbols.org/v2#ModuleDefinition').forEach(function(triple) {
        loadModuleDefinition(sbolDocument, sbolDocument.moduleDefinition(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Module').forEach(function(triple) {
        loadModule(sbolDocument, sbolDocument.module(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#MapsTo').forEach(function(triple) {
        loadMapping(sbolDocument, sbolDocument.mapping(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#FunctionalComponent').forEach(function(triple) {
        loadFunctionalComponent(sbolDocument, sbolDocument.functionalComponent(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Collection').forEach(function(triple) {
        loadCollection(sbolDocument, sbolDocument.collection(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#ComponentDefinition').forEach(function(triple) {
        loadComponentDefinition(sbolDocument, sbolDocument.componentDefinition(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Interaction').forEach(function(triple) {
        loadInteraction(sbolDocument, sbolDocument.interaction(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Participation').forEach(function(triple) {
        loadParticipation(sbolDocument, sbolDocument.participation(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Model').forEach(function(triple) {
        loadModel(sbolDocument, sbolDocument.model(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Sequence').forEach(function(triple) {
        loadSequence(sbolDocument, sbolDocument.sequence(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Range').forEach(function(triple) {
        loadRange(sbolDocument, sbolDocument.range(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#SequenceAnnotation').forEach(function(triple) {
        loadSequenceAnnotation(sbolDocument, sbolDocument.sequenceAnnotation(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#Component').forEach(function(triple) {
        loadComponent(sbolDocument, sbolDocument.component(), graph, triple);
    });

    graph.match(null, null, 'http://sbols.org/v2#SequenceConstraint').forEach(function(triple) {
        loadSequenceConstraint(sbolDocument, sbolDocument.sequenceConstraint(), graph, triple);
    });

    sbolDocument.link();

    // generic top levels?

    return sbolDocument;
}

