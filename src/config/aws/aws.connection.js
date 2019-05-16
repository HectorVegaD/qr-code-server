const AWS = require('aws-sdk');
const env = require('../../../environments/environment');


AWS.config.update({
    accessKeyId: env.AWS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region: 'us-west-1'
});

module.exports.s3 = new AWS.S3({ region: 'us-west-1'});