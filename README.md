# serverless-workshop

[![CircleCI](https://circleci.com/gh/xcomanche/serverless-lambda-boilerplate.svg?style=svg)](https://circleci.com/gh/xcomanche/serverless-lambda-boilerplate)

## Prerequisites
1. You should have AWS account activated.
1. Create 2 s3 buckets. One of those buckets should be a static website hosting. <br/>For more information refer to <b>Setup s3 buckets</b> section.
1. Create AWS user. <br/>For more information refer to <b>Create AWS User</b> section.
1. Copy AWS user credentials into your `~/.bash_profile` <br/>
`export AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY`<br/>
`export AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY`
1. Edit `circle.yml` and specify your parameters. <br/>For more information refer to <b>Setup circle.ci integration</b> section.

## Installation
1. Install node.js 6.x
1. Clone the repo and navigate to the project directory
1. `npm install`
1. Edit `src/config.js` and specify your params. For more information refer to <b>Setup config</b> section.
1. To test demo version of the app hit `npm run redeploy`

## NPM Commands
1. `npm run test` - Run unit tests
1. `build:app` - Build <b>lambda</b> functions from <b>src/</b> folders into <b>build/</b> folder
1. `deploy:app` - Deploy <b>lambda</b> functions from <b>build/</b> folder into <b>AWS account</b>
1. `build:doc` - Build <b>API Doc</b> from <b>src/</b> folder into <b>doc/</b> folder
1. `deploy:doc` - Deploy <b>API Doc</b> from <b>doc/</b> folder into <b>AWS S3</b> bucket
1. `redeploy` - Runs sequentially `build:app` than `deploy:app` than `build:doc` than `deploy:doc`

## Setup config
TBD

## Setup s3 buckets
TBD

## Setup circle.ci integration
TBD

## Contribution
This is free and opensource product. Just take and use it as you want to :)
