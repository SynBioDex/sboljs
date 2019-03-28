
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
    serializeComponentDefinition = require('./serializeComponentDefinition'),
    serializeModel = require('./serializeModel'),
	serializeAttachment = require('./serializeAttachment'),
    serializeImplementation = require('./serializeImplementation'),
    serializeSequence = require('./serializeSequence'),
    serializeGenericTopLevel = require('./serializeGenericTopLevel'),
    serializeProvActivity = require('./serializeProvActivity'),
    serializeProvPlan = require('./serializeProvPlan'),
    serializeProvAgent = require('./serializeProvAgent'),
    serializeCombinatorialDerivation = require('./serializeCombinatorialDerivation'),
    serializeVariableComponent = require('./serializeVariableComponent');

module.exports = function serializeXML(sbolDocument, attribs) {

    var xmlAttribs = extend({

        'xmlns:rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        'xmlns:dcterms': 'http://purl.org/dc/terms/',
        'xmlns:prov': 'http://www.w3.org/ns/prov#',
        'xmlns:sbol': 'http://sbols.org/v2#',
        'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema#dateTime/',
        'xmlns:om': 'http://www.ontology-of-units-of-measure.org/resource/om-2/',

    }, attribs || {})

    var nodes = []

    var xmlAttribsRef = {
        namespaces: xmlAttribs,
        lastNamespaceNum: 0
    } 

    sbolDocument.collections.forEach(function(collection) {
        nodes.push(serializeCollection(sbolDocument, xmlAttribsRef, collection));
    });

    sbolDocument.moduleDefinitions.forEach(function(moduleDefinition) {
        nodes.push(serializeModuleDefinition(sbolDocument, xmlAttribsRef, moduleDefinition));
    });

    sbolDocument.componentDefinitions.forEach(function(componentDefinition) {
        nodes.push(serializeComponentDefinition(sbolDocument, xmlAttribsRef, componentDefinition));
    });

    sbolDocument.models.forEach(function(model) {
        nodes.push(serializeModel(sbolDocument, xmlAttribsRef, model));
    });

	sbolDocument.attachments.forEach(function(attachment) {
        nodes.push(serializeAttachment(sbolDocument, xmlAttribsRef, attachment));
    });

    sbolDocument.implementations.forEach(function(implementation) {
        nodes.push(serializeImplementation(sbolDocument, xmlAttribsRef, implementation));
    });

    sbolDocument.sequences.forEach(function(sequence) {
        nodes.push(serializeSequence(sbolDocument, xmlAttribsRef, sequence));
    });

    sbolDocument.provActivities.forEach(function(activity) {
        nodes.push(serializeProvActivity(sbolDocument, xmlAttribsRef, activity));
    });

    sbolDocument.provAgents.forEach(function(agent) {
        nodes.push(serializeProvAgent(sbolDocument, xmlAttribsRef, agent));
    });

    sbolDocument.provPlans.forEach(function(plan) {
        nodes.push(serializeProvPlan(sbolDocument, xmlAttribsRef, plan));
    });

    sbolDocument.experiments.forEach(function(experiment) {
        nodes.push(serializeExperiment(sbolDocument, xmlAttribsRef, experiment));
    });

    sbolDocument.experimentalData.forEach(function(experimentalData) {
        nodes.push(serializeExperimentalData(sbolDocument, xmlAttribsRef, experimentalData));
    });

    sbolDocument.genericTopLevels.forEach(function(genericTopLevel) {
	if (genericTopLevel.displayId) {
            nodes.push(serializeGenericTopLevel(sbolDocument, xmlAttribsRef, genericTopLevel));
	}
    });

    sbolDocument.combinatorialDerivations.forEach(function(derivation) {
        nodes.push(serializeCombinatorialDerivation(sbolDocument, xmlAttribsRef, derivation));
    });

    nodes.push({
        _attr: xmlAttribsRef.namespaces
    })

    return xml({
        'rdf:RDF': nodes
    }, {
        declaration: true,
        indent: '  '
    });
}


