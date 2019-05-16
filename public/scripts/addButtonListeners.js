
const { ipcRenderer } = require('electron');

function addListeners(classname) {

  const buttonGroup = document.getElementsByClassName(classname);

  // add click listeners
  for (let btn of buttonGroup) {
    btn.onclick = handleClick;
  }

  function handleClick() {

    for(let b of buttonGroup) {
      b.disabled = true;
    }

    // send click notification to app.js
    ipcRenderer.send(`clicked:${classname}`, this.id);
  }
}

const sitTimer = document.getElementById('sit-timer');
const standTimer = document.getElementById('stand-timer');

ipcRenderer.on('timer:sit', (e, timer) => sitTimer.innerText = timer);
ipcRenderer.on('timer:stand', (e, timer) => standTimer.innerText = timer);

addListeners('orientation');
addListeners('time-control');
