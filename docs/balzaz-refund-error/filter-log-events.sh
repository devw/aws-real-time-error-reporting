
#!/bin/bash

# example
# source ./filter-log-events.sh  2021/12/31\ 04:58:06 2022/01/01\ 05:48:06 > /tmp/result.json

start_data=$(date -j -f date -j -f "%Y/%m/%d %T" "$1" +"%s000")
end_data=$(date -j -f date -j -f "%Y/%m/%d %T" "$2" +"%s000")
log_group_name=/aws/lambda/shopify-logtex-balzac-connector-prod-sync_in
# filter_pattern='{$.level = "ERROR" && $.message="ERROR - Couldn* refund order"}'
# filter_pattern='{$.event.Records[0].s3.object.key = "receive/b2c/RER*.csv"}'
# filter_pattern='{$.level = "ERROR"}'
# filter_pattern='{$.order_id = "4355726868630" || $.order_id = "4348305244310" || $.order_id = "4348305244310" || $.order_id = "4345551618198" || $.order_id = "4336533831830" || $.order_id = "4352097878166"}'
filter_pattern='{$.errorName = "TypeError" && $.stackTrace = "*functions/business/sync_in.js:219*"}'

filter_log () { 
  aws logs filter-log-events \
    --log-group-name $log_group_name  \
    --start-time $start_data \
    --end-time $end_data  \
    --filter-pattern $filter_pattern \
    --profile alfred-prod \
    --region eu-west-1
}

filter_log
