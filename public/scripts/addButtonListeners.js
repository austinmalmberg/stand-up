
const { ipcRenderer } = require('electron');

function initializeButton(classname) {

  let buttonGroup = document.getElementsByClassName(classname);

  for (let btn of buttonGroup) {
    btn.onclick = handleClick;
  }

  function handleClick() {
    for (let btn of buttonGroup) {
      if (btn === this)
        btn.disabled = true;
      else if (btn.disabled)
        btn.disabled = false;
    }

    ipcRenderer.send(classname, this.id);
  }
}

initializeButton('orientation');
initializeButton('time-control');
