
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
 * Class to represent a Variable component (SEP 007)
 */
class VariableComponent extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._variable = URI();
        this._operator = URI();
        this._variants = [];
        this._variantCollections = [];
        this._variantDerivations = [];
    }

    /**
     * Set the variable for this VariableComponent.
     * @param {string|URI|Component} [component]
     */
    set variable(variable) {
        this._variable = util.uriOrObject(variable);
    }

    /**
     * Retrieve the variable for this derivation.  Returns either a
     * URI or a Component, depending on whether the URI has been
     * resolved by link().
     *
     * @returns {URI|Component}
     */
    get variable() {
        return this._variable;
    }

    /**
     * Set the operator property for this VariableComponent.
     * @param {string|URI} [operator]
     */
    set operator(operator) {
        this._operator = URI(operator);
    }

    /**
     * Retrieve the operator property for this VariableComponent.
     * @returns {URI} [operator]
     */
    get operator() {
        return this._operator;
    }

    /**
     * Add a VariantCollection to this VariableComponent
     * @param {string|URI|Collection} [variantCollection]
     */
    addVariantCollection(variantCollection) {
        this._variantCollections.push(variantCollection);
    }

    get variantCollections() {
        return this._variantCollections.slice();
    }

    /**
     * Add a Variant to this VariableComponent
     * @param {string|URI|ComponentDefinition} [variant]
     */
    addVariant(variant) {
        this._variants.push(variant);
    }

    /**
     * Retrieve the variants for this derivation.  Returns either a 
     * list of URIs or Components, depending on whether they have been
     * resolved by link().
     *
     * @returns {URI[]|Component[]}
     */
    get variants() {
        return this._variants.slice();
    }

    /**
     * Add a VariantDerivation to this VariableComponent
     * @param {string|URI|ComponentDefinition} [variantDerivation]
     */
    addVariantDerivation(variantDerivation) {
        this._variantDerivations.push(variantDerivation)
    }

    get variantDerivations() {
        return this._variantDerivations.slice();
    }

    /**
     * Attempt to resolve the URIs linked to this variable component
     */
    link() {
        this._variable = this._sbolDocument.lookupURI(this._variable);
        this._variantDerivations = this._sbolDocument.lookupURIs(this._variantDerivations);
        this._variantCollections = this._sbolDocument.lookupURIs(this._variantCollections);
        this._variants = this._sbolDocument.lookupURIs(this._variants);
    }
}

module.exports = VariableComponent;


