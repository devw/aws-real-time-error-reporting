const aws = require('aws-sdk');
const ses = new aws.SES({ region: process.env.AWS_REGION });
const { getEmailContent } = require('../utils/get-email-content');

module.exports.sendEmail = async (log, message) => {
    console.log('sendEmail log, message:', { log, message });
    const emailContent = getEmailContent(log, message);
    await ses.sendEmail(emailContent).promise();
};
