module.exports = function(prefix, entity, version = ""){

  if (version == ""){
    str = prefix + entity;

  }

  else{

    str = prefix + entity + "/" + version;

  }

  return str;
};
