const SBOLDocument = require('../lib/SBOLDocument')

SBOLDocument.loadRDFFile(process.argv[2],(err,sbol) => {
    if (err) {
	console.log(err)
    } else {
	console.log(sbol.serializeXML({
            'xmlns:synbiohub': 'http://synbiohub.org#',
            'xmlns:sybio': 'http://www.sybio.ncl.ac.uk#',
            'xmlns:rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
            'xmlns:ncbi': 'http://www.ncbi.nlm.nih.gov#',
            'xmlns:igem': 'http://synbiohub.org/terms/igem/',
            'xmlns:gb': 'http://www.ncbi.nlm.nih.gov/',
	    'xmlns:annot' : 'http://myannotation.org/',
	    'xmlns:igem': 'http://parts.igem.org/#',
	    'xmlns:pr' : 'http://partsregistry.org/',
	    'xmlns:grn' : 'urn:bbn.com:tasbe:grn/',
	    'xmlns:myapp' : 'http://www.myapp.org/',
	    'xmlns:sbolhub' : 'http://sbolhub.org/',
	    'xmlns:grn' : 'urn:bbn.com:tasbe:grn/'
	}))
    }
})
		 
