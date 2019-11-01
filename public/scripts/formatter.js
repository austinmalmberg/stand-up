
function secondsAsString(secs) {
  let seconds = (secs % 60).toString().padStart(2, '0');
  let minutes = (Math.floor(secs / 60) % 60).toString().padStart(2, '0');
  let hours = (Math.floor(secs / 60 / 60)).toString();

  return `${hours}:${minutes}:${seconds}`;
}

function msAsString(ms) {
  return secondsAsString(Math.round(ms / 1000));
}
