var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = require('request')

const SBOLDocument = require('../lib/SBOLDocument')

var inputFile

readTextFile('file://'+process.argv[2],(err,result) => {
    inputFile = result
})

SBOLDocument.loadRDF(inputFile,(err,sbol) => {
    if (err) {
	console.log(err)
    } else {
	request(
	    { method: 'POST',
	      uri: 'http://www.async.ece.utah.edu/validate/',
	      'content-type': 'application/json',
	      json: { 'options': {'language' : 'SBOL2',
				  'test_equality': true,
				  'check_uri_compliance': false,
				  'check_completeness': false,
				  'check_best_practices': false,
				  'continue_after_first_error': false,
				  'provide_detailed_stack_trace': false,
				  'insert_type': false,
				  'main_file_name': 'main file',
				  'diff_file_name': 'comparison file',
				 },
		      'return_file': true,
		      'main_file': inputFile,
		      'diff_file': sbol.serializeXML({
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
		      })
		    }
	    }, function(err, response, body) {
		if(err || response.statusCode >= 300) {
		    console.log('err='+err)
		    console.log('response='+response)
		    console.log('body='+body)
		} else {
		    body.errors.forEach((error) => {
			if (!error.toString().startsWith('Namespace')) {
			    console.log(error)
			}
		    })
		};
	    }
	)
    }
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