var pjson = require('../package.json');
var jsonfile = require('jsonfile');
var config = require('../src/config');

const apiDocConfig = {
    "name": config.apidoc.name,
    "version": pjson.version,
    "description": config.apidoc.desc,
    "title": config.apidoc.title,
    "url" : config.apidoc.url
};

jsonfile.writeFileSync('./apidoc.json', apiDocConfig);
console.log('ApiDoc config file generated with API Version: [' + pjson.version + ']');