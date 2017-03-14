# serverless-lambda-boilerplate
This project is powered by
[![Serverless](https://files.readme.io/PxwIpAFoRCaTxnA20bxL_logo_readmeio_serverless.png)](https://serverless.com/)

Circle CI Status
[![CircleCI](https://circleci.com/gh/xcomanche/serverless-lambda-boilerplate/tree/master.svg?style=svg)](https://circleci.com/gh/xcomanche/serverless-lambda-boilerplate/tree/master) 

The main goal of this Project is to have structured approach to develop, test, build, deploy and document serverless micro-services. Based on AWS Lambda, and serverless micro-framework.
Out of the box you will get:
1. Clear folder structure to put your code logically splitted to node.js modules.
1. Installed Karma tests runner with 100% code coverage, and corrals tests reporter. 
1. Installed and configured APIDOC generator, with automated deployment to S3 Bucket and static webhosting.
1. Automated API versioning based on NPM versioning (version of API correspond version in package.json)

## Prerequisites
1. You should have AWS account activated.
1. Create 2 s3 buckets. One of those buckets should be a static website hosting. <br/>For more information refer to <b>Setup s3 buckets</b> section.
1. Create AWS user. <br/>For more information refer to <b>Create AWS User</b> section.
1. Copy AWS user credentials into your `~/.bash_profile` <br/>
`export AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY`<br/>
`export AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY`
1. Edit `circle.yml` and specify your parameters. <br/>For more information refer to <b>Setup circle.ci integration</b> section.

## Installation
1. [Install node.js 4.x/6.x](https://nodejs.org/en/download/) 
1. `git clone git@github.com:xcomanche/serverless-lambda-boilerplate.git`
1. `cd serverless-lambda-boilerplate`
1. `npm install`
1. Edit `src/config.js` and specify your params. For more information refer to <b>Setup config</b> section.
1. To test demo version of the app hit `npm run redeploy`

## NPM Commands
1. `npm run clean` - Clean <b>build</b> folder
1. `npm run test` - Run unit tests
1. `build:app` - Build <b>lambda</b> functions from <b>src/</b> folders into <b>build/</b> folder
1. `deploy:app` - Deploy <b>lambda</b> functions from <b>build/</b> folder into <b>AWS account</b>
1. `build:doc` - Build <b>API Doc</b> from <b>src/</b> folder into <b>doc/</b> folder
1. `deploy:doc` - Deploy <b>API Doc</b> from <b>doc/</b> folder into <b>AWS S3</b> bucket
1. `redeploy` - Runs sequentially `npm run clean` than `build:app` than `deploy:app` than `build:doc` than `deploy:doc`

## Serverless commands
Follow the documentation on [Serverless project](https://serverless.com/) 
## Setup config
TBD

## Setup s3 buckets
TBD

## Setup circle.ci integration
TBD

## Contribution
This is free and opensource product. Just take and use it as you want to :)
