# **This library only supports SBOL2. For a JavaScript/TypeScript library with support for a wider range of SBOL versions including SBOL1 and SBOL3, see [sboljs3](https://github.com/synbiodex/sboljs3).**

--

[![Build Status](https://travis-ci.org/SynBioDex/sboljs.svg?branch=master)](https://travis-ci.org/SynBioDex/sboljs)


BSD-licensed implementation of the [Synthetic Biology Open Language](http://sbolstandard.org) (SBOL) in JavaScript.

Requires a JavaScript environment with ES6 class support (e.g. recent versions of node, Chrome, ...)

Features:

* Read generic RDF, XML
* Serialize SBOL XML, JSON
* Build SBOL documents programatically

Installation
------------

    npm install sboljs

Usage
-----

    var SBOLDocument = require('sboljs')

    SBOLDocument.loadRDFFile('foo.xml', function(err, doc) {

        doc.componentDefinitions.forEach(function(componentDefinition) {

            console.log(componentDefinition.name)

        })

    })


[Documentation](http://synbiodex.github.io/sboljs)








