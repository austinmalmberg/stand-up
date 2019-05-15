
const { ipcRenderer } = require('electron');

function addOrientationListeners() {

  const buttonGroup = document.getElementsByClassName('orientation');

  // add click listeners
  for (let btn of buttonGroup) {
    btn.onclick = handleClick;
  }

  function handleClick() {

    // TODO: Disable other buttons in group

    // send info to app.js
    ipcRenderer.send('orientation', { elementId: this.id });
  }
}

function addTimeControlListeners() {

  const buttonGroup = document.getElementsByClassName('time-control');

  // add click listeners
  for (let btn of buttonGroup) {
    btn.onclick = handleClick;
  }

  function handleClick() {

    // TODO: Disable other buttons in group

    // send info to app.js
    ipcRenderer.send('time-control', { elementId: this.id });
  }
}

function disable(group, button) {

}

const sitTimer = document.getElementById('sit-timer');

// bind callbacks
ipcRenderer.send('init-btn', {
  elementId: 'sit',
  callback: (timeFormatted) => {
    sitTimer.innerHTML = timeFormatted;
  },
  timerElement: sitTimer
});

const standTimer = document.getElementById('stand-timer');

ipcRenderer.send('init-btn', {
  elementId: 'stand',
  callback: (timeFormatted) => {
    standTimer.innerHTML = timeFormatted;
  },
  timerElement: standTimer
});

addOrientationListeners();
addTimeControlListeners();
