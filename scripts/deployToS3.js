var s3 = require('s3');
var config = require('../src/config');

var client = s3.createClient({
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
var replaced = false;
var branchEnv = process.env.BRANCH ? process.env.BRANCH : 'dev';

Object.keys(config.branches).forEach(function(branch) {
    var results = branchEnv.match(config.branches[branch]);

    if(results && results.length) {
        replaced = true;
        branchEnv = branch;
    }
});
if (!replaced) {
    branchEnv = branchEnv.replace('/', '').replace('.', '');
}

var params = {
    localDir: "./doc",
    deleteRemoved: true, // default false, whether to remove s3 objects
                         // that have no corresponding local file.

    s3Params: {
        Bucket: config.apidoc.s3,
        Prefix: branchEnv
    },
};

var uploader = client.uploadDir(params);
var currentProgress = 0;

uploader.on('error', function(err) {
    console.error("unable to sync:", err.stack);
});
uploader.on('progress', function() {
    var percentageAmount = uploader.progressTotal / 100;
    currentProgress = (uploader.progressAmount / percentageAmount).toFixed(2);
    if (currentProgress && !isNaN(currentProgress)) {
        console.log("progress: ", currentProgress, "%");
    }
});
uploader.on('end', function() {
    console.log("New APIDOC deployed. Visit: ", config.apidoc.url + '/' + branchEnv);
});