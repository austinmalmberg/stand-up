
function secondsFormatted(secs) {
  let seconds = (secs % 60).toString().padStart(2, '0');
  let minutes = (Math.floor(secs / 60) % 60).toString().padStart(2, '0');
  let hours = (Math.floor(secs / 60 / 60)).toString();

  return `${hours}:${minutes}:${seconds}`;
}

module.exports = secondsFormatted;
