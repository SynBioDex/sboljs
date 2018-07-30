SBOLDocument = require('sboljs');
createUri = require('./createUri');
cdTypes = require('./componentDefinitionTypes');
so = require('./sequenceOntology');
sbo = require('./systemsBiologyOntology')
var $ = require('jquery');
jQuery = require('jquery');
require('jquery-ui-bundle');
var terminals = require('./terminals');
var readChapter = require('./readChapter')
var hljs = require('highlight.js');
var JSrun = require('./JSrun.js');

window.doc = new SBOLDocument();

console.log(window.doc);

document.getElementById('run').addEventListener('click', function() {
  console.log('clicked run')
  JSrun()
});

$("#resetDoc").click(function(){
  window.doc = new SBOLDocument();
  terminals.myCodeMirror2.setValue('')

});

$(".chap").click(function(){

  var chap = this.id.substr(-1);

  var file = "";

  if (chap == "w"){

    file = "./Chapters/Overview.txt";

  }

  else{

    file = "./Chapters/Chapter" + chap + ".txt"

  }

  readChapter(file, function() {

    highlight();

  });

})

$("#openbutton").click(function(){

  $("#mySidenav").css('width', '5%');

})


$("#closebutton").click(function(){

  document.getElementById("mySidenav").style.width = "0";


})


$("#toggleimg").click(function(){

  if ($("#hovercrisprimg").css('display') == "none"){

    $("#hovercrisprimg").css('display', 'inline');

  }

  else{

    $("#hovercrisprimg").css('display', 'none');


  }

})

function highlight(){

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

}

highlight();

jQuery("#hovercrisprimg").draggable();
