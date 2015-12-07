
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

/**
 * Class to represent an SBOL2 document in memory.
 */
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
        this._URIs = {};
        this._unresolvedURIs = {};
    }

    /**
     * Create a new Collection in the document.
     * @param {string} [uri] - The URI of the Collection
     * @returns {Collection}
     */
    collection(uri) {
        var collection = new Collection(this, uri);
        this._collections.push(collection);
        return collection;
    }

    /**
     * Create a new Model in the document.
     * @param {string} [uri] - The URI of the Model
     * @returns {Model}
     */
    model(uri) {
        var model = new Model(this, uri);
        this._models.push(model);
        return model;
    }

    /**
     * Create a new ModuleDefinition in the document.
     * @param {string} [uri] - The URI of the ModuleDefinition
     * @returns {ModuleDefinition}
     */
    moduleDefinition(uri) {
        var moduleDefinition = new ModuleDefinition(this, uri);
        this._moduleDefinitions.push(moduleDefinition);
        return moduleDefinition;
    }

    /**
     * Create a new Module in the document.
     * @param {string} [uri] - The URI of the Module
     * @returns {Module}
     */
    module(uri) {
        var module = new Module(this, uri);
        this._modules.push(module);
        return module;
    }

    /**
     * Create a new Mapping in the document.
     * @param {string} [uri] - The URI of the Mapping
     * @returns {Mapping}
     */
    mapping(uri) {
        var mapping = new MapsTo(this, uri);
        this._mappings.push(mapping);
        return mapping;
    }

    /**
     * Create a new ComponentDefinition in the document.
     * @param {string} [uri] - The URI of the ComponentDefinition
     * @returns {ComponentDefinition}
     */
    componentDefinition(uri) {
        var componentDefinition = new ComponentDefinition(this, uri);
        this._componentDefinitions.push(componentDefinition);
        return componentDefinition;
    }

    /**
     * Create a new Sequence in the document.
     * @param {string} [uri] - The URI of the Sequence
     * @returns {Sequence}
     */
    sequence(uri) {
        var sequence = new Sequence(this, uri);
        this._sequences.push(sequence);
        return sequence;
    }

    /**
     * Create a new FunctionalComponent in the document.
     * @param {string} [uri] - The URI of the FunctionalComponent
     * @returns {FunctionalComponent}
     */
    functionalComponent(uri) {
        var functionalComponent = new FunctionalComponent(this, uri);
        this._functionalComponents.push(functionalComponent);
        return functionalComponent;
    }

    /**
     * Create a new Interaction in the document.
     * @param {string} [uri] - The URI of the Interaction
     * @returns {Interaction}
     */
    interaction(uri) {
        var interaction = new Interaction(this, uri);
        this._interactions.push(interaction);
        return interaction;
    }

    /**
     * Create a new Participation in the document.
     * @param {string} [uri] - The URI of the Participation
     * @returns {Participation}
     */
    participation(uri) {
        var participation = new Participation(this, uri);
        this._participations.push(participation);
        return participation;
    }

    /**
     * Create a new Range in the document.
     * @param {string} [uri] - The URI of the Range
     * @returns {Range}
     */
    range(uri) {
        var range = new Range(this, uri);
        this._ranges.push(range);
        return range;
    }

    /**
     * Create a new Cut in the document.
     * @param {string} [uri] - The URI of the Cut
     * @returns {Cut}
     */
    cut(uri) {
        var cut = new Cut(this, uri);
        this._cuts.push(cut);
        return cut;
    }

    /**
     * Create a new GenericLocation in the document.
     * @param {string} [uri] - The URI of the GenericLocation
     * @returns {GenericLocation}
     */
    genericLocation(uri) {
        var genericLocation = new GenericLocation(this, uri);
        this._genericLocations.push(genericLocation);
        return genericLocation;
    }

    /**
     * Create a new SequenceAnnotation in the document.
     * @param {string} [uri] - The URI of the SequenceAnnotation
     * @returns {SequenceAnnotation}
     */
    sequenceAnnotation(uri) {
        var sequenceAnnotation = new SequenceAnnotation(this, uri);
        this._sequenceAnnotations.push(sequenceAnnotation);
        return sequenceAnnotation;
    }

    /**
     * Create a new Component in the document.
     * @param {string} [uri] - The URI of the Component
     * @returns {Component}
     */
    component(uri) {
        var component = new Component(this, uri);
        this._components.push(component);
        return component;
    }

    /**
     * Create a new SequenceConstraint in the document.
     * @param {string} [uri] - The URI of the SequenceConstraint
     * @returns {SequenceConstraint}
     */
    sequenceConstraint(uri) {
        var sequenceConstraint = new SequenceConstraint(this, uri);
        this._sequenceConstraints.push(sequenceConstraint);
        return sequenceConstraint;
    }

    /**
     * Attempt to resolve any unresolved URIs in the document, replacing them
     * with their instantiated object.
     */
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

    /**
     * Returns a list of all ModuleDefinitions in the document
     * @returns {ModuleDefinition[]}
     */
    get moduleDefinitions() {
        return this._moduleDefinitions.slice(0);
    }

    /**
     * Returns a list of all Modules in the document
     * @returns {Module[]}
     */
    get modules() {
        return this._modules.slice(0);
    }

    /**
     * Returns a list of all Mappings in the document
     * @returns {Mapping[]}
     */
    get mappings() {
        return this._mappings.slice(0);
    }

    /**
     * Returns a list of all ComponentDefinitions in the document
     * @returns {ComponentDefinition[]}
     */
    get componentDefinitions() {
        return this._componentDefinitions.slice(0);
    }

    /**
     * Returns a list of all SequenceAnnotations in the document
     * @returns {SequenceAnnotation[]}
     */
    get sequenceAnnotations() {
        return this._sequenceAnnotations.slice(0);
    }

    /**
     * Returns a list of all Interactions in the document
     * @returns {Interaction[]}
     */
    get interactions() {
        return this._interactions.slice(0);
    }

    /**
     * Returns a list of all Participations in the document
     * @returns {Participation[]}
     */
    get participations() {
        return this._participations.slice(0);
    }

    /**
     * Returns a list of all Sequences in the document
     * @returns {Sequence[]}
     */
    get sequences() {
        return this._sequences.slice(0);
    }

    /**
     * Returns a list of all SequenceConstraints in the document
     * @returns {SequenceConstraint[]}
     */
    get sequenceConstraints() {
        return this._sequenceConstraints.slice(0);
    }

    /**
     * Returns a list of all Models in the document
     * @returns {Model[]}
     */
    get models() {
        return this._models.slice(0);
    }

    /**
     * Returns a list of all Components in the document
     * @returns {Component[]}
     */
    get components() {
        return this._components.slice(0);
    }

    /**
     * Map a URI to an object, such that lookupURI will return the object and
     * the URI will be removed from unresolvedURIs if present.
     *
     * @param {string|URI} uri - The URI to map
     * @param {*} object - The object to map to the URI
     */
    mapURI(uri, object) {

        if(uri instanceof URI)
            uri = uri.toString();

        if(this._URIs[uri] !== undefined) {
            console.warn('Replacing URI: ' + uri);
        }

        this._URIs[uri] = object;
    }

    /**
     * The reverse of mapURI.  Unmap a URI from an object, such that lookupURI
     * will no longer return the object.
     *
     * @param {string|URI} uri - The URI to unmap
     * @param {*} object - The object to unmap from the URI
     */
    unmapURI(uri, object) {

        if(this._URIs[uri] === object)
            delete this._URIs[uri];
    }

    /**
     * Return the corresponding object for a URI, if resolved.  If the URI
     * has not been resolved, it will be returned unmodified.
     *
     * @param {string|URI} uri
     * @returns {Array}
     */
    lookupURI(uri) {

        if(typeof(uri) === 'string')
            uri = URI(uri);

        if(uri instanceof URI) {

            uri = uri.toString();

            var object = this._URIs[uri];

            if(object === undefined) {
                console.warn('Unresolved URI: ' + uri);
                this._unresolvedURIs[uri] = true;
            } else {
                delete this._unresolvedURIs[uri]
            }

            return object;
        }

        return uri;
    }

    /**
     * Map a list of URIs to their corresponding objects, if resolved. 
     * Unresolved URIs will be returned unmodified.
     * @param {URI[]} uris
     * @returns {Array}
     */
    lookupURIs(uris) {

        return uris.map((uri) => {
            if(uri instanceof URI) {
                return this.lookupURI(uri);
            } else {
                return uri;
            }
        });
    }

    /**
     * Returns a list of all unresolved URIs in the document.
     * @returns {string[]}
     */
    get unresolvedURIs() {
        return Object.keys(this._unresolvedURIs)
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

    /**
     * Load a new SBOL document from an RDF/XML string.
     *
     * @param {string} rdf - A string containing valid RDF/XML
     * @param {function(err: Error, sbol: SBOLDocument)} callback
     */
    static loadRDF(rdf, callback) {

        var sbolDocument = new SBOLDocument();

        sbolDocument.loadRDF(rdf, (err) => {

            if(err)
                callback(err);
            else
                callback(null, sbolDocument);

        })
    }

    /**
     * Load a new SBOL document from an RDF/XML file.
     *
     * @param {string} filename - The name of the file
     * @param {function(err: Error, sbol: SBOLDocument)} callback
     */
    static loadRDFFile(filename, callback) {

        fs.readFile(filename, function(err, file) {

            SBOLDocument.loadRDF(file + '', callback);
        })
    }

    /**
     * Load RDF/XML into the document.  The existing contents of the document
     * will be preserved.
     *
     * @param {string} rdf - A string containing valid RDF/XML
     * @param {function(err: Error)} callback
     */
    loadRDF(rdf, callback) {

        var load = require('./load/rdf/loadRDF');

        load(this, rdf, callback);
    }

    /**
     * Serialize the document to SBOL RDF/XML
     * @returns {string}
     */
    serializeXML() {
        var args = Array.prototype.slice.call(arguments, 0);
        return require('./serialize/xml/serializeXML').apply(this, [this].concat(args));
    }

    /**
     * Serialize the document to JSON
     * @returns {string}
     */
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


