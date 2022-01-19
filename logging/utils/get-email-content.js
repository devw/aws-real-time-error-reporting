const { AWS_EMAIL, AWS_SES_ARN } = process.env;

module.exports.getEmailContent = (data, message) => {
    let events = data.events;
    let logData = '<br/><h2><u>Application Logs</u></h2>';
    for (let i in events) {
        logData += `<pre>${JSON.stringify(events[i], null, 4)}</pre>`;
    }

    let date = new Date(message.StateChangeTime);
    let text = `Alarm Name:<b>${message.AlarmName}</b><br/>Details: <a href="https://my.example.com">Production URL</a><br/>Account ID:${
        message.AWSAccountId
    }<br/>Region:${message.Region}<br/>Alarm Time:${date.toString()}<br/>${logData}`;
    let subject = `Details for Alarm - ${message.AlarmName} [URGENT]`;

    let emailContent = {
        Destination: {
            ToAddresses: [AWS_EMAIL],
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: text,
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: text,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
        },
        Source: AWS_EMAIL,
        SourceArn: AWS_SES_ARN,
        Tags: [
            {
                Name: 'sender',
                Value: 'Antonio',
            },
        ],
    };

    return emailContent;
};
