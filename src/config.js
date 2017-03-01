module.exports = {
    aws: {
        region: 'eu-west-1', // AWS Region
        s3: 'itweek-workshop', // S3 Bucket name for Lambda resources
    },
    apidoc: {
        s3: 'itweek-workshop-doc', // S3 Bucket name for APIDOC
        url: 'http://itweek-workshop-doc.s3-website-eu-west-1.amazonaws.com/' // URL for APIDOC website
    }
};