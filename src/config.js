module.exports = {
    aws: {
        region: 'eu-west-1', // AWS Region
        s3: 'itweek-workshop', // S3 Bucket name for Lambda resources
        url: 'https://1dn9ql7rul.execute-api.eu-west-1.amazonaws.com/dev' // URL to Lambda endpoint
    },
    apidoc: {
        name: "serverless-lambda-boilerplate",
        desc: "apiDoc for serverless lambda boilerplate",
        title: "API Doc for serverless-lambda boilerplate",
        s3: 'itweek-workshop-doc', // S3 Bucket name for APIDOC
        url: 'http://itweek-workshop-doc.s3-website-eu-west-1.amazonaws.com' // URL for APIDOC website
    },
    entities: {
        users: {
            dtoDriver: 'aws/s3',
            path: 'users.json'
        }
    }
};