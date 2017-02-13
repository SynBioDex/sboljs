
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
 extend = require('extend');

module.exports = function serializeGenericTopLevel(sbolDocument, xmlAttribsRef, genericTopLevel) {

    var namespaces = listNamespaces(xmlAttribsRef.namespaces).filter(function(namespace) {
        return genericTopLevel.rdfType.indexOf(namespace.uri) === 0;
    });

    var namespace
    var prefixedName
    if(namespaces.length === 0) {
	if (genericTopLevel.rdfType.lastIndexOf('/') > genericTopLevel.rdfType.lastIndexOf('#') && 
	    genericTopLevel.rdfType.lastIndexOf('/') > genericTopLevel.rdfType.lastIndexOf(':')) {
	    namespace = genericTopLevel.rdfType.substring(0,genericTopLevel.rdfType.lastIndexOf('/')+1)
	} else if (genericTopLevel.rdfType.lastIndexOf('#') > genericTopLevel.rdfType.lastIndexOf(':')) {
	    namespace = genericTopLevel.rdfType.substring(0,genericTopLevel.rdfType.lastIndexOf('#')+1)
	} else {
	    namespace = genericTopLevel.rdfType.substring(0,genericTopLevel.rdfType.lastIndexOf(':')+1)
	}
	var prefix = namespace.replace('http://','').replace('https://','')
	prefix = prefix.substring(0,prefix.length-1)
	if (prefix.lastIndexOf('/') > prefix.lastIndexOf('#') && 
	    prefix.lastIndexOf('/') > prefix.lastIndexOf(':')) {
	    prefix = prefix.slice(prefix.lastIndexOf('/')+1)
	} else if (prefix.lastIndexOf('#') > prefix.lastIndexOf(':')) {
	    prefix = prefix.slice(prefix.lastIndexOf('#')+1)
	} else if (prefix.lastIndexOf(':') > 0) {
	    prefix = prefix.slice(prefix.lastIndexOf(':')+1)
	}
	if (prefix.indexOf('.') > 0) {
	    prefix = namespace.substring(0,prefix.indexOf('.'))
	}
	prefixedName = prefix + ':' + genericTopLevel.rdfType.slice(namespace.length)
        //throw new Error('No namespace found for genericTopLevel: ' + genericTopLevel.rdfType);
	prefix = 'xmlns:'+prefix
	xmlAttribsRef.namespaces[prefix] = namespace
    } else {
	namespace = namespaces.sort((a, b) => a.uri.length - b.uri.length)[0];
	prefixedName = namespace.prefix + ':' + genericTopLevel.rdfType.slice(namespace.uri.length);
    }
    var serializeIdentified = require('./serializeIdentified');

    return serializeIdentified(sbolDocument, xmlAttribsRef, genericTopLevel, prefixedName, []);

}

function listNamespaces(xmlAttribs) {

    var namespaces = [];

    Object.keys(xmlAttribs).forEach(function(attrib) {

        var tokens = attrib.split(':');

        if(tokens[0] === 'xmlns') {

            namespaces.push({
                prefix: tokens[1],
                uri: xmlAttribs[attrib]
            })
        }
    });

    return namespaces;
}

