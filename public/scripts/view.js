const orientation = document.getElementById('current-orientation');
const timerControl = document.getElementById('timer-control');
const main = document.getElementsByTagName('main')[0];

function lightOn(boolean) {
  if (typeof bool !== 'boolean') {
    return timerControl.classList.contains('light-on');

  } else if (bool) {

    main.classList.remove('light-on');
    main.classList.add('light-off');

  } else {

    main.classList.remove('light-off');
    main.classList.add('light-on');
  }
}

function timerOn(bool) {
  if (typeof bool !== 'boolean')
    return timerControl.classList.contains('switch-on');

  else if (bool) {

    timerControl.classList.remove('switch-off');
    timerControl.classList.add('switch-on');

  } else {

    timerControl.classList.remove('switch-on');
    timerControl.classList.add('switch-off');

  }
}

function standing(bool) {
  if (typeof bool !== 'boolean')
    return orientation.classList.contains('standing');

  else if (bool) {

    orientation.classList.remove('sitting');
    orientation.classList.add('standing');

  } else {

    orientation.classList.remove('standing');
    orientation.classList.add('sitting');
  }
}

module.exports = { standing, timerOn, lightOn };
