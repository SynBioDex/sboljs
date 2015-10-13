
"use strict";

var fs = require('fs'),
    URI = require('urijs');

var ModuleDefinition = require('./ModuleDefinition'),
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

    collection() {
        var collection = new Collection(this);
        this._collections.push(collection);
        return collection;
    }

    model() {
        var model = new Model(this);
        this._models.push(model);
        return model;
    }

    moduleDefinition() {
        var moduleDefinition = new ModuleDefinition(this);
        this._moduleDefinitions.push(moduleDefinition);
        return moduleDefinition;
    }

    componentDefinition() {
        var componentDefinition = new ComponentDefinition(this);
        this._componentDefinitions.push(componentDefinition);
        return componentDefinition;
    }

    sequence() {
        var sequence = new Sequence(this);
        this._sequences.push(sequence);
        return sequence;
    }

    functionalComponent() {
        var functionalComponent = new FunctionalComponent(this);
        this._functionalComponents.push(functionalComponent);
        return functionalComponent;
    }

    interaction() {
        var interaction = new Interaction(this);
        this._interactions.push(interaction);
        return interaction;
    }

    participation() {
        var participation = new Participation(this);
        this._participations.push(participation);
        return participation;
    }

    range() {
        var range = new Range(this);
        this._ranges.push(range);
        return range;
    }

    sequenceAnnotation() {
        var sequenceAnnotation = new SequenceAnnotation(this);
        this._sequenceAnnotations.push(sequenceAnnotation);
        return sequenceAnnotation;
    }

    component() {
        var component = new Component(this);
        this._components.push(component);
        return component;
    }

    sequenceConstraint() {
        var sequenceConstraint = new SequenceConstraint(this);
        this._sequenceConstraints.push(sequenceConstraint);
        return sequenceConstraint;
    }

    link() {
        
        this.moduleDefinitions.forEach(function(moduleDefinition) {
            moduleDefinition.link();
        });

        this.componentDefinitions.forEach(function(componentDefinition) {
            componentDefinition.link();
        });

        this.sequenceAnnotations.forEach(function(sequenceAnnotation) {
            sequenceAnnotation.link();
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

    mapURI(uri, object) {

        if(uri instanceof URI)
            uri = uri.toString();

        this.URIs[uri] = object;
    }

    unmapURI(uri, object) {

        if(this.URIs[uri] === object)
            delete this.URIs[uri];
    }

    lookupURI(uri) {

        if(typeof(uri) === 'string')
            uri = URI(uri);

        if(uri instanceof URI)
            return this.URIs[uri.toString()];

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
        return require('./serialize/xml/serializeXML')(this);
    }
}


module.exports = SBOLDocument;


