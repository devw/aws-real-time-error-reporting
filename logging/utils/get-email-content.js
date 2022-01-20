const cleanLog = (log) => {
    const value = log.split('\tINFO\t')[1];
    return JSON.parse(value.replace(/[\n\t]/g, '').replace(/\s{2,}/g, ' '));
};

module.exports.getEmailContent = (data, message) => {
    let events = data.events;
    let logData = '<br/><h2><u>Application Logs</u></h2>';
    for (let i in events) {
        events[i].message = cleanLog(events[i].message);
        logData += `<pre>${JSON.stringify(events[i], null, 4)}</pre>`;
    }

    let date = new Date(message.StateChangeTime);
    let text = `Alarm Name:<b>${message.AlarmName}</b><br/>Details: <a href="https://my.example.com">Production URL</a><br/>Account ID:${
        message.AWSAccountId
    }<br/>Region:${message.Region}<br/>Alarm Time:${date.toString()}<br/>${logData}`;
    let subject = `Details for Alarm - ${message.AlarmName} [URGENT]`;
    console.log('subject:', subject);

    return {
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
    };
};
