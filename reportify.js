const fs = require('fs');
const args = process.argv.slice(2);
let file = args[0];

init = () => {
  file = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
  doMath(file);
}

doMath = (file) => {
  outputs = [];
  file.Lambdas.forEach((row) => {
    outputs.push( Math.floor(parseInt(row['Statuses']['200'],10)/parseInt(row['TotalReqs'],10)*100));
  });
  minimum = Math.min(...outputs);
  maximum = Math.max(...outputs);
  average = outputs.reduce((a,b) => a + b, 0) / outputs.length;

  console.log('Total rows:  ' + outputs.length);
  console.log('Max success: ' + maximum + '%');
  console.log('Min success: ' + minimum + '%');
  console.log('Avg success: ' + average + '%');
}

init();

