"use strict";

var URI = require('urijs'),
    Identified = require('./Identified'),
    util = require('./util');

/**
 * Class to represent a participation in an Interaction.
 */
class ProvAssociation extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._roles = [];
    }

    /**
     * Assign a role to this Participation.
     * @param {string|URI} [role]
     */
    addRole(role) {
        this._roles.push(URI(role));
    }

    /**
     * Retrieve the list of roles assigned to this Participation.
     * @returns {URI[]} [roles]
     */
    get roles() {
        return this._roles.slice();
    }

	link() {
		this._agent = this._sbolDocument.lookupURI(this._agent);
		this._plan = this._sbolDocument.lookupURI(this._plan);
    }
}

module.exports = ProvAssocation;
