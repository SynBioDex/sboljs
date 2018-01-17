"use strict";

var Identified = require('./Identified');

class ProvPlan extends Identified
{
    constructor(sbolDocument, uri) {
        super(sbolDocument, uri);
    }
	
	link() {
		super.link();
	}
}
module.exports = ProvPlan;
