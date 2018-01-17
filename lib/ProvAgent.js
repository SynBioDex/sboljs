"use strict";

var Identified = require('./Identified');

class ProvAgent extends Identified
{
    constructor(sbolDocument, uri) {
        super(sbolDocument, uri);
    }
	
	link() {
		super.link();
	}
}
module.exports = ProvAgent;
