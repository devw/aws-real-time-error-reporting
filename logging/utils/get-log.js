const aws = require('aws-sdk');
const cwl = new aws.CloudWatchLogs({ region: process.env.AWS_REGION });

module.exports.getLog = async (message) => {
    const metricParams = {
        metricName: message.Trigger.MetricName,
        metricNamespace: message.Trigger.Namespace,
    };
    console.log('getLog requestParams:', metricParams);

    const metricInfo = await cwl.describeMetricFilters(metricParams).promise();
    const timestamp = Date.parse(message.StateChangeTime);
    const offset = message.Trigger.Period * message.Trigger.EvaluationPeriods * 1000;
    const metricFilter = metricInfo.metricFilters[0];
    const parameters = {
        logGroupName: metricFilter.logGroupName,
        filterPattern: metricFilter.filterPattern ? metricFilter.filterPattern : '',
        startTime: timestamp - offset,
        endTime: timestamp,
    };
    return await cwl.filterLogEvents(parameters).promise();
};
