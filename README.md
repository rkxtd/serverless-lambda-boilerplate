# serverless-lambda-boilerplate
### This project is powered by
[![Serverless](https://files.readme.io/PxwIpAFoRCaTxnA20bxL_logo_readmeio_serverless.png)](https://serverless.com/)

### Project Status
[![CircleCI](https://img.shields.io/circleci/project/github/xcomanche/serverless-lambda-boilerplate/master.svg)](https://circleci.com/gh/xcomanche/serverless-lambda-boilerplate/tree/master) 
[![Coverage Status](https://coveralls.io/repos/github/xcomanche/serverless-lambda-boilerplate/badge.svg)](https://coveralls.io/github/xcomanche/serverless-lambda-boilerplate) 
[![Dependency Status](https://david-dm.org/xcomanche/serverless-lambda-boilerplate.svg)](https://david-dm.org/xcomanche/serverless-lambda-boilerplate)
[![devDependency Status](https://david-dm.org/xcomanche/serverless-lambda-boilerplate/dev-status.svg)](https://david-dm.org/xcomanche/serverless-lambda-boilerplate?type=dev)
[![Github All Releases](https://img.shields.io/github/downloads/xcomanche/serverless-lambda-boilerplate/total.svg)](https://codeload.github.com/xcomanche/serverless-lambda-boilerplate/zip/master)

The main goal of this Project is to have structured approach to develop, test, build, deploy and document serverless micro-services. Based on AWS Lambda, and serverless micro-framework.

### What you will get:
- [x] Clear folder structure to put your code logically splitted to node.js modules.
- [x] Installed Karma tests runner with 100% code coverage, and corrals tests reporter. 
- [x] Installed and configured APIDOC generator, with automated deployment to S3 Bucket and static webhosting.
- [x] Configured CI integration
- [x] All kinds of badges
- [ ] Automated API versioning based on NPM versioning (version of API correspond version in package.json)
- [ ] Local development environment with possibility to run lambda functions and navigate thought generated APIDOC
- [ ] Integration tests

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
