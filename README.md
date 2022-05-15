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

# Citation

If you use this library in your work, please cite

    @article{sboljs,
      author = {McLaughlin, James Alastair and Myers, Chris J. and Zundel, Zach and Wilkinson, Nathan and Atallah, Christian and Wipat, Anil},
      title = {sboljs: Bringing the Synthetic Biology Open Language to the Web Browser},
      journal = {ACS Synthetic Biology},
      volume = {8},
      number = {1},
      pages = {191-193},
      year = {2019},
      doi = {10.1021/acssynbio.8b00338},
      URL = { https://doi.org/10.1021/acssynbio.8b00338 },
      eprint = {  https://doi.org/10.1021/acssynbio.8b00338 }
    }
    
    





