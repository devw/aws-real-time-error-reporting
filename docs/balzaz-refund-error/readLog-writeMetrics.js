const { readFile, writeFile, appendFile } = require('fs/promises');
const getData = async (fPath) => await readFile(fPath, 'utf8');
const INPUT_FILE = 'suivi-remboursements.in';
const OUTPUT_FILE = 'orders.out';

const cleanLog = (log) => {
    const value = log.split('\tINFO\t')[1];
    const json = JSON.parse(
        value.replace(/[\n\t]/g, '').replace(/\s{2,}/g, ' ')
    );
    json.date = log.slice(0, 25);
    return json;
};

const writeMetrics = async (log) => {
    const { order_id, message, date } = log;
    const arr = [order_id, date, message];
    const row = arr.join('</td><td>');
    appendFile(OUTPUT_FILE, `<tr><td>${row}</td></tr>\n`);
};

const main = async () => {
    const data = await getData(INPUT_FILE);
    const { events } = JSON.parse(data);
    const logs = events.map((e) => cleanLog(e.message));
    logs.forEach(writeMetrics);
};

main();
