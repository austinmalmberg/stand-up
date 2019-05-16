
const { ipcRenderer } = require('electron');

function addListeners(classname) {

  const buttonGroup = document.getElementsByClassName(classname);

  // add click listeners
  for (let btn of buttonGroup) {
    btn.onclick = handleClick;
  }

  function handleClick() {

    disableButton(buttonGroup, this);

    removeRunning();

    // send click notification to app.js
    ipcRenderer.send(`clicked:${classname}`, this.id);
  }
}

function disableButton(group, btn) {

  for(let b of group) {
    if (btn === b)
      b.setAttribute('disabled', 'true');
    else if (b.disabled === true) {
      b.removeAttribute('disabled');
    }
  }
}

const sitTimer = document.getElementById('sit-timer');
const standTimer = document.getElementById('stand-timer');

function removeRunning() {
  sitTimer.classList.remove('running');
  standTimer.classList.remove('running');
}


// send ping to app.js that the window is ready
window.onload = () => {
  ipcRenderer.send('index:ready', null);
}

// get state and reply
ipcRenderer.on('ready:init', (e, req) => {
  document.getElementById(req.state).setAttribute('disabled', 'true');
  document.getElementById(req.status).setAttribute('disabled', 'true');
});

ipcRenderer.on('timer:sit', (e, timer) => {
  sitTimer.classList.add('running');
  sitTimer.innerText = timer;
});
ipcRenderer.on('timer:stand', (e, timer) => {
  standTimer.classList.add('running');
  standTimer.innerText = timer;
});

addListeners('state');
addListeners('time-control');
