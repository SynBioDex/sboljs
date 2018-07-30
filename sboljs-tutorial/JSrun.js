var $ = require('jquery');
var terminals = require('./terminals');

module.exports = function() {

    var str;

    $("#JSoutput").val('');

    d = new Date().getTime();

    try {
        eval(terminals.myCodeMirror1.getValue())

    } catch(e) {
        str = e.name+" at line "+(e.lineNumber-56)+": "+e.message;
        alert(str)
    }

      terminals.myCodeMirror2.setValue(doc.serializeXML());

};
