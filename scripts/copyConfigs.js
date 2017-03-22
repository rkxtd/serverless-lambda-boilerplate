var YAML = require('yamljs');
var config = require('../src/config');
var fs = require('fs');
var serverlessYAML = YAML.load('./src/serverless.yml');

var replaced = false;
var branchEnv = process.env.BRANCH ? process.env.BRANCH : 'dev';

Object.keys(config.branches).forEach(function(branch) {
    var results = branchEnv.match(config.branches[branch]);
    if(results && results.length) {
        replaced = true;
        serverlessYAML.provider.stage = serverlessYAML.provider.stage.replace('%branch%', branch)
    }
});
if (!replaced) {
    serverlessYAML.provider.stage = serverlessYAML.provider.stage.replace('%branch%', branchEnv.replace('/', '').replace('.', ''));
}

fs.writeFileSync('./build/serverless.yml', YAML.stringify(serverlessYAML, 4));
console.log('serverless.yml file generated');