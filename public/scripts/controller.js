// const { standing, timerOn, lightOn } = require('./view');

// const orientation = document.getElementById('current-orientation');
// const timerControl = document.getElementById('timer-control');
// const main = document.getElementsByTagName('main')[0];

orientation.onclick = () => {
  standing(!standing());
}
timerControl.onclick = () => {
  if (timerOn()) {
    timerOn(false);
    lightOn(false);
  } else {
    timerOn(true);
    lightOn(true);
  }

};
