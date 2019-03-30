
var URI = require('urijs'),
    Identified = require('./Identified'),
    util = require('./util');

class Measure extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._value = 0
        this._unit = URI('')
	this._types = [];
    }

    set value(value) {
        this._value = value
    }

    get value() {
        return this._value
    }

    set unit(unit) {
        this._unit = URI(unit)
    }

    get unit() {
        return this._unit
    }
    
    /**
     * Add a type to this Interaction.
     * @param {string|URI} [type]
     */
    addType(type) {
        this._types.push(util.uriOrObject(type));
    }

    /**
     * Retrieve a list of types for this Interaction.
     * @returns {URI[]} [types]
     */
    get types() {
        return this._types;
    }

}

module.exports = Measure

