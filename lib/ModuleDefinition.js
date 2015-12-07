
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

var URI = require('urijs'),
    Identified = require('./Identified'),
    util = require('./util');

/**
 * Class to represent an SBOL2 ModuleDefinition.
 */
class ModuleDefinition extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._roles = [];
        this._modules = [];
        this._functionalComponents = [];
        this._interactions = [];
    }

    /**
     * Assign a role to this ModuleDefinition.
     * @param {string|URI} [role]
     */
    addRole(role) {
        this._roles.push(URI(role));
    }

    /**
     * Add a Module to this ModuleDefinition.
     * @param {string|URI|Module} [module]
     */
    addModule(module) {
        this._modules.push(util.uriOrObject(module));
    }

    /**
     * Add a FunctionalComponent to this ModuleDefinition.
     * @param {string|URI|FunctionalComponent} [component]
     */
    addFunctionalComponent(component) {
        this._functionalComponents.push(util.uriOrObject(component));
    }

    /**
     * Add an Interaction to this ModuleDefinition.
     * @param {string|URI|Interaction} [interaction]
     */
    addInteraction(interaction) {
        this._interactions.push(util.uriOrObject(interaction));
    }

    /**
     * Retrieve the list of roles assigned to this ModuleDefinition
     * @returns {URI[]}
     */
    get roles() {
        return this._roles.slice(0);
    }

    /**
     * Retrieve the list of modules assigned to this ModuleDefinition.  There
     * may be URIs present in this list if the module(s) have not yet been
     * resolved.
     *
     * @returns {Module[]}
     */
    get modules() {
        return this._modules.slice(0);
    }

    /**
     * Retrieve the list of FunctionalComponents assigned to this
     * ModuleDefinition.  There may be URIs present in this list if the
     * component(s) have not yet been resolved.
     *
     * @returns {FunctionalComponent[]}
     */
    get functionalComponents() {
        return this._functionalComponents.slice(0);
    }

    /**
     * Retrieve the list of Interactions assigned to this ModuleDefinition.
     * There may be URIs present in this list if the interaction(s) have not
     * yet been resolved.
     *
     * @returns {Interaction[]}
     */
    get interactions() {
        return this._interactions.slice(0);
    }

    /**
     * Attempt to resolve the Modules, FunctionalComponents, and Interactions
     * assigned to this ModuleDefinition by URI.
     */
    link() {

        this._modules = this._sbolDocument.lookupURIs(this._modules);
        this._functionalComponents = this._sbolDocument.lookupURIs(this._functionalComponents);
        this._interactions = this._sbolDocument.lookupURIs(this._interactions);
    }
}

module.exports = ModuleDefinition;















