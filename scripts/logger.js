const fs = require('fs');
const filepath = 'public/data/log.json';

function logTimerData(stateTimers) {
  const d = new Date();
  const data = {
    year: d.getFullYear(),
    month: d.getMonth(),
    date: d.getDate()
  }
  Object.keys(stateTimers).forEach(timerName => data[timerName] = stateTimers[timerName].seconds());

  const json = JSON.stringify(data, null, 4);
  fs.writeFile(filepath, json, { encoding: 'utf8', flag: 'w' }, () => console.log('write successful'));
}

module.exports = { logTimerData };
