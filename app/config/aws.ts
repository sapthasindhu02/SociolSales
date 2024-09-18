import AWS from 'aws-sdk';
import awsConfig from './config';

AWS.config.update({
  accessKeyId: awsConfig.apiKey,
  secretAccessKey: awsConfig.secretAccessKey,
  region: awsConfig.region,
});

export default AWS;