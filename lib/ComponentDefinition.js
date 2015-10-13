
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified');

class ComponentDefinition extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._types = [];
        this._roles = [];
        this._components = [];
        this._sequenceAnnotations = [];
        this._sequenceConstraints = [];
        this._sequences = [];
    }

    addType(type) {
        if(this._types.indexOf(type) === -1)
            this._types.push(type);
    }

    addComponent(component) {
        if(this._components.indexOf(component) === -1)
            this._components.push(component);
    }

    addRole(role) {
        if(this._roles.indexOf(role) === -1)
            this._roles.push(role);
    }

    addSequenceAnnotation(sequenceAnnotation) {
        if(this._sequenceAnnotations.indexOf(sequenceAnnotation) === -1)
            this._sequenceAnnotations.push(sequenceAnnotation);
    }

    addSequenceConstraint(sequenceConstraint) {
        if(this._sequenceConstraints.indexOf(sequenceConstraint) === -1)
            this._sequenceConstraints.push(sequenceConstraint);
    }

    addSequence(sequence) {
        if(this._sequences.indexOf(sequence) === -1)
            this._sequences.push(sequence);
    }

    get types() {
        return this._types.slice(0);
    }

    get components() {
        return this._components.slice(0);
    }

    get sequenceAnnotations() {
        return this._sequenceAnnotations.slice(0);
    }

    get sequenceConstraints() {
        return this._sequenceConstraints.slice(0);
    }

    get sequences() {
        return this._sequences.slice(0);
    }

    get roles() {
        return this._roles.slice(0);
    }

    link() {

        this._components = this._sbolDocument.lookupURIs(this._components);
        this._sequenceAnnotations = this._sbolDocument.lookupURIs(this._sequenceAnnotations);
        this._sequenceConstraints = this._sbolDocument.lookupURIs(this._sequenceConstraints);
        this._sequences = this._sbolDocument.lookupURIs(this._sequences);
    }
}

module.exports = ComponentDefinition;





