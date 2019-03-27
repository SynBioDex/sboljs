
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
	loadAttachment = require('./loadAttachment'),
    loadImplementation = require('./loadImplementation'),
    loadParticipation = require('./loadParticipation'),
    loadRange = require('./loadRange'),
    loadCut = require('./loadCut'),
    loadGenericLocation = require('./loadGenericLocation'),
    loadSequence = require('./loadSequence'),
    loadSequenceAnnotation = require('./loadSequenceAnnotation'),
    loadSequenceConstraint = require('./loadSequenceConstraint'),
    loadCombinatorialDerivation = require('./loadCombinatorialDerivation'),
    loadVariableComponent = require('./loadVariableComponent'),
    loadProvActivity = require('./loadProvActivity'),
    loadProvAssociation = require('./loadProvAssociation'),
    loadProvUsage = require('./loadProvUsage'),
    loadProvPlan = require('./loadProvPlan'),
    loadProvAgent = require('./loadProvAgent'),
    loadGenericTopLevel = require('./loadGenericTopLevel');
    loadCombinatorialDerivation = require('./loadCombinatorialDerivation'),
    loadVariableComponent = require('./loadVariableComponent'),
    loadExperiment = require('./loadExperiment'),
    loadExperimentalData = require('./loadExperimentalData'),
    loadMeasure = require('./loadMeasure');

var RdfGraphArray = require('rdf-graph-array').Graph

module.exports = function load(sbolDocument, sources, callback) {

    if(!Array.isArray(sources))
        sources = [ sources ]

    var parser = new RdfXmlParser();

    var graph = new RdfGraphArray([])

    loadNextSource()

    function loadNextSource() {

        parser.parse(sources[0], function(err, graph) {

            if(err)
                return callback(err);

            sources = sources.slice(1)

            if(sources.length === 0) {

                loadRDFGraph(sbolDocument, graph);

                callback(null);

            } else {

                loadNextSource()

            }

        }, undefined, undefined, graph);

    }
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

	graph.match(null, a, 'http://sbols.org/v2#Attachment').forEach(
        (triple) => loadAttachment(sbolDocument, sbolDocument.attachment(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Implementation').forEach(
        (triple) => loadImplementation(sbolDocument, sbolDocument.implementation(triple.subject.toString()), graph.match(triple.subject))
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
    graph.match(null, a, 'http://sbols.org/v2#VariableComponent').forEach(
        (triple) => loadVariableComponent(sbolDocument, sbolDocument.variableComponent(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#CombinatorialDerivation').forEach(
        (triple) => loadCombinatorialDerivation(sbolDocument, sbolDocument.combinatorialDerivation(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://www.w3.org/ns/prov#Activity').forEach(
        (triple) => loadProvActivity(sbolDocument, sbolDocument.provActivity(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://www.w3.org/ns/prov#Association').forEach(
        (triple) => loadProvAssociation(sbolDocument, sbolDocument.provAssociation(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://www.w3.org/ns/prov#Agent').forEach(
        (triple) => loadProvAgent(sbolDocument, sbolDocument.provAgent(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://www.w3.org/ns/prov#Plan').forEach(
        (triple) => loadProvPlan(sbolDocument, sbolDocument.provPlan(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://www.w3.org/ns/prov#Usage').forEach(
        (triple) => loadProvUsage(sbolDocument, sbolDocument.provUsage(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#Experiment').forEach(
        (triple) => loadExperiment(sbolDocument, sbolDocument.experiment(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://sbols.org/v2#ExperimentalData').forEach(
        (triple) => loadExperimentalData(sbolDocument, sbolDocument.experimentalData(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, 'http://www.ontology-of-units-of-measure.org/resource/om-2/Measure').forEach(
        (triple) => loadMeasure(sbolDocument, sbolDocument.measure(triple.subject.toString()), graph.match(triple.subject))
    );

    graph.match(null, a, null).forEach((triple) => {
	if (!triple.object.toString().startsWith('http://sbols.org')&&
	   !triple.object.toString().startsWith('http://www.w3.org/ns/prov')) {
	    loadGenericTopLevel(sbolDocument, sbolDocument.genericTopLevel(triple.subject.toString(),triple.object.toString()),  graph.match(triple.subject))
	}
    });
    sbolDocument.link();

}

