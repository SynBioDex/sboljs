
"use strict";

var URI = require('urijs'),
    Identified = require('./Identified');

class ModuleDefinition extends Identified
{
    constructor(sbolDocument) {

        super(sbolDocument);

        this._roles = [];
        this._functionalComponents = [];
        this._interactions = [];
    }

    addRole(role) {

        if(this._roles.indexOf(role) === -1)
            this._roles.push(role);
    }

    addFunctionalComponent(component) {

        if(typeof(component) === 'string')
            component = URI(component);

        if(component instanceof URI) {

            this._functionalComponents.push(component);

        } else {

            this.sbolDocument.addFunctionalComponent(component);
            this.addFunctionalComponent(component.persistentIdentity);
        }
    }

    addInteraction(interaction) {

        if(this._interactions.indexOf(interaction) === -1)
            this._interactions.push(interaction);
    }

    get roles() {
        return this._roles.slice(0);
    }

    get functionalComponents() {
        return this._functionalComponents.slice(0);
    }

    get interactions() {
        return this._interactions.slice(0);
    }

    link() {

        this._functionalComponents = this._sbolDocument.lookupURIs(this._functionalComponents);
        this._interactions = this._sbolDocument.lookupURIs(this._interactions);
    }
}

module.exports = ModuleDefinition;















