
let threshold = 1000;

function log(state, timer) {
  if (timer.elapsed() < threshold) return;
}

function setThreshold(ms) {
  threshold = ms;
}

module.exports = { log, setThreshold };
