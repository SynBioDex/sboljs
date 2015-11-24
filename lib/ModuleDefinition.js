
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

class ModuleDefinition extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._roles = [];
        this._modules = [];
        this._functionalComponents = [];
        this._interactions = [];
    }

    addRole(role) {
        this._roles.push(URI(role));
    }

    addModule(module) {
        this._modules.push(util.uriOrObject(module));
    }

    get modules() {
        return this._modules.slice(0);
    }

    addFunctionalComponent(component) {
        this._functionalComponents.push(util.uriOrObject(component));
    }

    addInteraction(interaction) {
        this._interactions.push(util.uriOrObject(interaction));
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

        this._modules = this._sbolDocument.lookupURIs(this._modules);
        this._functionalComponents = this._sbolDocument.lookupURIs(this._functionalComponents);
        this._interactions = this._sbolDocument.lookupURIs(this._interactions);
    }
}

module.exports = ModuleDefinition;















