var $ = require('jquery');

module.exports = function(chapter, callback){

  $.get(chapter, function(data){

    $("#guide_chap").empty();

    $("#guide_chap").append(data);

    callback()
  });

}
