var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = require('request')

const SBOLDocument = require('../lib/SBOLDocument')

var inputFile

readTextFile('file://'+process.argv[2],(err,result) => {
    inputFile = result
})

SBOLDocument.loadRDF(inputFile,(err,sbol) => {
    console.log(sbol.serializeXML({
			  'xmlns:synbiohub': 'http://synbiohub.org#',
			  'xmlns:sybio': 'http://www.sybio.ncl.ac.uk#',
			  'xmlns:rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
			  'xmlns:ncbi': 'http://www.ncbi.nlm.nih.gov#',
			  'xmlns:igem': 'http://synbiohub.org/terms/igem/',
			  'xmlns:genbank': 'http://www.ncbi.nlm.nih.gov/genbank/',
			  'xmlns:annot' : 'http://myannotation.org/',
			  'xmlns:igem': 'http://parts.igem.org/#',
			  'xmlns:pr' : 'http://partsregistry.org/',
			  'xmlns:grn' : 'urn:bbn.com:tasbe:grn/',
			  'xmlns:myapp' : 'http://www.myapp.org/',
			  'xmlns:sbolhub' : 'http://sbolhub.org/',
			  'xmlns:grn' : 'urn:bbn.com:tasbe:grn/'
    }))
})
		 
function readTextFile(file,callback)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                callback(null,allText);
            }
        }
    }
    rawFile.send(null);
}