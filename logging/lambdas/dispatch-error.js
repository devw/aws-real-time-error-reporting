const { getLog } = require('../utils/get-log');
const { sendEmail } = require('../utils/send-email');

module.exports.handler = async (event, context) => {
    console.log('JSON.stringify(event): ', JSON.stringify(event));
    context.callbackWaitsForEmptyEventLoop = false;
    const message = JSON.parse(event.Records[0].Sns.Message);
    const log = await getLog(message);
    await sendEmail(log, message);
};
