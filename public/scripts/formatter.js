
function secondsAsString(secs) {
  const seconds = (secs % 60).toString().padStart(2, '0');
  const minutes = (Math.floor(secs / 60) % 60).toString().padStart(2, '0');
  const hours = (Math.floor(secs / 60 / 60)).toString();

  return `${hours}:${minutes}:${seconds}`;
}

function msToString(ms) {
  return secondsAsString(Math.round(ms / 1000));
}
