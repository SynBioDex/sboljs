
var URI = require('urijs'),
    Identified = require('./Identified'),
    util = require('./util');

class Measure extends Identified
{
    constructor(sbolDocument, uri) {

        super(sbolDocument, uri);

        this._value = 0
        this._unit = URI('')
    }

    set value(value) {
        this._value = value
    }

    get value() {
        return this._value
    }

    set unit(unit) {
        this._unit = unit
    }

    get unit() {
        return this._unit
    }
}

module.exports = Measure

