var s3 = require('s3');
var config = require('../config');

var client = s3.createClient({
    s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

var params = {
    localDir: "./doc",
    deleteRemoved: true, // default false, whether to remove s3 objects
                         // that have no corresponding local file.

    s3Params: {
        Bucket: config.apidoc.s3,
        Prefix: "",
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
    console.log("New APIDOC deployed. Visit: ", config.apidoc.url);
});