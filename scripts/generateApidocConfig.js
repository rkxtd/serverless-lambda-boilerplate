var jsonfile = require('jsonfile');
var YAML = require('yamljs');
var fs = require('fs');
var pjson = require('../package.json');
var config = require('../src/config');
var serviceURLBeginning = fs.readFileSync('./build/.serviceurl');
var serverlessYAML = YAML.load('./build/serverless.yml');
var serviceURL = serviceURLBeginning.toString().replace(/\n$/, "") + '.' + serverlessYAML.provider.region + '.amazonaws.com/' + serverlessYAML.provider.stage;

const apiDocConfig = {
    "name": config.apidoc.name,
    "version": pjson.version,
    "description": config.apidoc.desc,
    "title": config.apidoc.title + ' v[' +serverlessYAML.provider.stage + ']',
    "url" : serviceURL
};

jsonfile.writeFileSync('./apidoc.json', apiDocConfig);
console.log('ApiDoc config file generated with API Version: [' + pjson.version + ']');