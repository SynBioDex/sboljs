
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

var fs = require('fs'),
    URI = require('urijs');

var ModuleDefinition = require('./ModuleDefinition'),
    Module = require('./Module'),
    MapsTo = require('./MapsTo'),
    Collection = require('./Collection'),
    Model = require('./Model'),
    ComponentDefinition = require('./ComponentDefinition'),
    Sequence = require('./Sequence'),
    FunctionalComponent = require('./FunctionalComponent'),
    Interaction = require('./Interaction'),
    Participation = require('./Participation'),
    Range = require('./Range'),
    SequenceAnnotation = require('./SequenceAnnotation'),
    Component = require('./Component'),
    SequenceConstraint = require('./SequenceConstraint');

class SBOLDocument
{
    constructor() {

        this._collections = [];
        this._moduleDefinitions = [];
        this._modules = [];
        this._mappings = [];
        this._models = [];
        this._componentDefinitions = [];
        this._sequences = [];
        this._functionalComponents = [];
        this._interactions = [];
        this._participations = [];
        this._ranges = [];
        this._sequenceAnnotations = [];
        this._sequenceConstraints = [];
        this._components = [];
        this.URIs = {};
    }

    collection(uri) {
        var collection = new Collection(this, uri);
        this._collections.push(collection);
        return collection;
    }

    model(uri) {
        var model = new Model(this, uri);
        this._models.push(model);
        return model;
    }

    moduleDefinition(uri) {
        var moduleDefinition = new ModuleDefinition(this, uri);
        this._moduleDefinitions.push(moduleDefinition);
        return moduleDefinition;
    }

    module(uri) {
        var module = new Module(this, uri);
        this._modules.push(module);
        return module;
    }

    mapping(uri) {
        var mapping = new MapsTo(this, uri);
        this._mappings.push(mapping);
        return mapping;
    }

    componentDefinition(uri) {
        var componentDefinition = new ComponentDefinition(this, uri);
        this._componentDefinitions.push(componentDefinition);
        return componentDefinition;
    }

    sequence(uri) {
        var sequence = new Sequence(this, uri);
        this._sequences.push(sequence);
        return sequence;
    }

    functionalComponent(uri) {
        var functionalComponent = new FunctionalComponent(this, uri);
        this._functionalComponents.push(functionalComponent);
        return functionalComponent;
    }

    interaction(uri) {
        var interaction = new Interaction(this, uri);
        this._interactions.push(interaction);
        return interaction;
    }

    participation(uri) {
        var participation = new Participation(this, uri);
        this._participations.push(participation);
        return participation;
    }

    range(uri) {
        var range = new Range(this, uri);
        this._ranges.push(range);
        return range;
    }

    cut(uri) {
        var cut = new Cut(this, uri);
        this._cuts.push(cut);
        return cut;
    }

    genericLocation(uri) {
        var genericLocation = new GenericLocation(this, uri);
        this._genericLocations.push(genericLocation);
        return genericLocation;
    }

    sequenceAnnotation(uri) {
        var sequenceAnnotation = new SequenceAnnotation(this, uri);
        this._sequenceAnnotations.push(sequenceAnnotation);
        return sequenceAnnotation;
    }

    component(uri) {
        var component = new Component(this, uri);
        this._components.push(component);
        return component;
    }

    sequenceConstraint(uri) {
        var sequenceConstraint = new SequenceConstraint(this, uri);
        this._sequenceConstraints.push(sequenceConstraint);
        return sequenceConstraint;
    }

    link() {
        
        this.moduleDefinitions.forEach(function(moduleDefinition) {
            moduleDefinition.link();
        });
        
        this.modules.forEach(function(module) {
            module.link();
        });
        
        this.mappings.forEach(function(mapping) {
            mapping.link();
        });

        this.sequenceAnnotations.forEach(function(sequenceAnnotation) {
            sequenceAnnotation.link();
        });

        this.componentDefinitions.forEach(function(componentDefinition) {
            componentDefinition.link();
        });

        this.components.forEach(function(component) {
            component.link();
        });

        this.interactions.forEach(function(interaction) {
            interaction.link();
        });

        this.participations.forEach(function(participation) {
            participation.link();
        });

    }

    get moduleDefinitions() {
        return this._moduleDefinitions.slice(0);
    }

    get modules() {
        return this._modules.slice(0);
    }

    get mappings() {
        return this._mappings.slice(0);
    }

    get componentDefinitions() {
        return this._componentDefinitions.slice(0);
    }

    get sequenceAnnotations() {
        return this._sequenceAnnotations.slice(0);
    }

    get interactions() {
        return this._interactions.slice(0);
    }

    get participations() {
        return this._participations.slice(0);
    }

    get sequences() {
        return this._sequences.slice(0);
    }

    get sequenceConstraints() {
        return this._sequenceConstraints.slice(0);
    }

    get models() {
        return this._models.slice(0);
    }

    get components() {
        return this._components.slice(0);
    }

    mapURI(uri, object) {

        if(uri instanceof URI)
            uri = uri.toString();

        if(this.URIs[uri] !== undefined) {
            console.warn('Replacing URI: ' + uri);
        }

        this.URIs[uri] = object;
    }

    unmapURI(uri, object) {

        if(this.URIs[uri] === object)
            delete this.URIs[uri];
    }

    lookupURI(uri) {

        if(typeof(uri) === 'string')
            uri = URI(uri);

        if(uri instanceof URI) {

            var object = this.URIs[uri.toString()];

            if(object === undefined) {
                console.warn('Undefined URI: ' + uri);
            }

            return object;
        }

        return uri;
    }

    lookupURIs(uris) {

        return uris.map((uri) => {
            if(uri instanceof URI) {
                return this.lookupURI(uri);
            } else {
                return uri;
            }
        });
    }

    toDisplayList() {

        var displayList = {
            segments: []
        };

        this.componentDefinitions.forEach(function(componentDefinition) {

            var segment = {
                sequence: []
            };

            displayList.segments.push(segment);

            componentDefinition.sequenceAnnotations.forEach(function(sequenceAnnotation) {

                var component = sequenceAnnotation.getComponent();

                segment.sequence.push({
                    name: component.getName()
                });




            });
        });

        return displayList;
    }

    static loadRDF(rdf, callback) {
        return require('./load/rdf/loadRDF')(rdf, callback);
    }

    static loadRDFFile(filename, callback) {

        fs.readFile(filename, function(err, file) {

            SBOLDocument.loadRDF(file + '', callback);
        });
    }

    serializeXML() {
        var args = Array.prototype.slice.call(arguments, 0);
        return require('./serialize/xml/serializeXML').apply(this, [this].concat(args));
    }

    serializeJSON() {
        var args = Array.prototype.slice.call(arguments, 0);
        return require('./serialize/json/serializeJSON').apply(this, [this].concat(args));
    }
}

SBOLDocument.terms = {
    promoter: 'http://identifiers.org/so/SO:0000167',
    operator: 'http://identifiers.org/so/SO:0000057',
    cds: 'http://identifiers.org/so/SO:0000316',
    fivePrimeUtr: 'http://identifiers.org/so/SO:0000204',
    terminator: 'http://identifiers.org/so/SO:0000141',
    insulator: 'http://identifiers.org/so/SO:0000627',
    originOfReplication: 'http://identifiers.org/so/SO:0000296',
    primerBindingSite: 'http://identifiers.org/so/SO:0005850',
    ribosomeBindingSite: 'http://identifiers.org/so/SO:0000139',
    gene: 'http://identifiers.org/so/SO:0000704',
    rna: 'http://identifiers.org/so/SO:0000234',
    restrictionSite: 'http://identifiers.org/so/SO:0001687',
    bluntRestrictionSite: 'http://identifiers.org/so/SO:0001691',
    assemblyScar: 'http://identifiers.org/so/SO:0001953',
    engineeredGene: 'http://identifiers.org/so/SO:0000280',
    engineeredRegion: 'http://identifiers.org/so/SO:0000804',
    conservedRegion: 'http://identifiers.org/so/SO:0000330',

    dnaRegion: 'http://www.biopax.org/release/biopax-level3.owl#DnaRegion',
    rnaRegion: 'http://www.biopax.org/release/biopax-level3.owl#RnaRegion',
    protein: 'http://www.biopax.org/release/biopax-level3.owl#Protein',
    smallMolecule: 'http://www.biopax.org/release/biopax-level3.owl#SmallMolecule',
    effector: 'http://identifiers.org/chebi/CHEBI:35224',

    dnaSequence: 'http://www.chem.qmul.ac.uk/iubmb/misc/naseq.html',
    rnaSequence: 'http://www.chem.qmul.ac.uk/iubmb/misc/naseq.html',
    proteinSequence: 'http://www.chem.qmul.ac.uk/iupac/AminoAcid/'
}

module.exports = SBOLDocument;


