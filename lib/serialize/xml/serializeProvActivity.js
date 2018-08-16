
/*
 * Copyright (C) 2017 ICOS Group, Newcastle University.  All rights reserved.
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
    serializeIdentified = require('./serializeIdentified'),
    serializeProvAssociation = require('./serializeProvAssociation'),
    serializeProvUsage = require('./serializeProvUsage')

module.exports = function serializeProvActivity(sbolDocument, xmlAttribsRef, activity) {

    var attr = []

    if(activity.startedAtTime) {

        attr.push({
            'prov:startedAtTime': [
                {
                    _attr: {
                        'rdf:datatype': 'http://www.w3.org/2001/XMLSchema#dateTime'
                    }
                },
                activity.startedAtTime.toISOString()
            ]
        })

    }

    if(activity.endedAtTime) {

        attr.push({
            'prov:endedAtTime': [
                {
                    _attr: {
                        'rdf:datatype': 'http://www.w3.org/2001/XMLSchema#dateTime'
                    }
                },
                activity.endedAtTime.toISOString()
            ]
        })

    }

    activity.usages.forEach((usage) => {
        attr.push({ 'prov:qualifiedUsage': [
            serializeProvUsage(sbolDocument, xmlAttribsRef, usage)
        ]})
    })
 
    activity.associations.forEach((association) => {
        attr.push({ 'prov:qualifiedAssociation': [
            serializeProvAssociation(sbolDocument, xmlAttribsRef, association)
        ]})
    })
 
    activity.wasInformedBys.forEach((wasInformedBy) => {
        attr.push({ 'prov:wasInformedBy': { _attr: { 'rdf:resource': wasInformedBy.uri?wasInformedBy.uri:wasInformedBy}}});
    })
        
    return serializeIdentified(sbolDocument, xmlAttribsRef, activity, 'prov:Activity', attr)

}

