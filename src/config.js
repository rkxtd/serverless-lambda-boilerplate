module.exports = {
    aws: {
        region: 'eu-west-1', // AWS Region
        url: 'https://gnrsdm5uqh.execute-api.eu-west-1.amazonaws.com/feature1' // URL to Lambda endpoint
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
            bucket: 'itweek-workshop',
            path: 'resources/users.json'
        }
    }
};