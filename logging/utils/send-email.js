const { AWS_EMAIL, AWS_SES_ARN } = process.env;
const aws = require('aws-sdk');
const ses = new aws.SES({ region: process.env.AWS_REGION });
const { getEmailContent } = require('../utils/get-email-content');

module.exports.sendEmail = async (log, message) => {
    let email = {
        Destination: {
            ToAddresses: [AWS_EMAIL],
        },
        Message: getEmailContent(log, message),
        Source: AWS_EMAIL,
        SourceArn: AWS_SES_ARN,
        Tags: [
            {
                Name: 'sender',
                Value: 'Antonio',
            },
        ],
    };
    const result = await ses.sendEmail(email).promise();
    console.log('sendEmail result:', result);
};
