const fs = require('fs');
const args = process.argv.slice(2);
let file = args[0];

init = () => {
  file = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));

  printBlank();
  doPercentages(file);
  doTiming(file);
  printBar();
  printBlank();
}

calcAverage = (arr) => {
  return arr.reduce((a,b) => a + b, 0) / arr.length;
}

printBlank = () => {
  console.log('');
}

printBar = () => {
  console.log('=============');
}

doPercentages = (file) => {
  outputs = [];
  file.Lambdas.forEach((row) => {
    outputs.push( Math.floor(parseInt(row['Statuses']['200'],10)/parseInt(row['TotalReqs'],10)*100));
  });
  minimum = Math.min(...outputs);
  maximum = Math.max(...outputs);
  average = calcAverage(outputs);

  printBar();
  console.log('Total rows:  ' + outputs.length);
  console.log('Max success: ' + maximum + '%');
  console.log('Min success: ' + minimum + '%');
  console.log('Avg success: ' + average + '%');
}

doTiming = (file) => {
  timeToFirstByte = [];
  timeForReq = [];
  slowest = [];
  fastest = [];
  file.Lambdas.forEach((row) => {
    timeToFirstByte.push(row['AveTimeToFirst']/1000000000);
    timeForReq.push(row['AveTimeForReq']/1000000000);
    slowest.push(row['Slowest']/1000000000);
    fastest.push(row['Fastest']/1000000000);
  });
  
  printBar();
  console.log('Avg time to first byte: ' + calcAverage(timeToFirstByte).toFixed(2) + 's');
  console.log('Avg time for request:   ' + calcAverage(timeForReq).toFixed(2) + 's');
  console.log('Avg slowest:            ' + calcAverage(slowest).toFixed(2) + 's');
  console.log('Avg fastest:            ' + calcAverage(fastest).toFixed(2) + 's');
}

init();

