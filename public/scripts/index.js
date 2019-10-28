
const { ipcRenderer } = require('electron');

/**
 * Add onclick listeners to all elements of the given class.
 *
 * This onclick listener disables the button, removes the running class from
 * the orientation timers, and sends a message to app.js that the button was
 * clicked.  NOTE: Message sent is determined by the given classname and the
 * id of the element clicked
 */
function addListeners(classname) {

  const buttonGroup = document.getElementsByClassName(classname);

  // add click listeners
  for (let btn of buttonGroup) {
    btn.onclick = handleClick;
  }

  function handleClick() {

    disableButton(buttonGroup, this);
    removeRunTimerStyling();

    // send click notification to app.js
    ipcRenderer.send(`clicked: ${classname}`, this.id);
  }
}

/**
 * Disables the provided button, btn, within the given button group.  Also
 * removes disabled attributes from all other buttons.  NOTE: If btn is not in
 * group, this will not disable btn and will remove all disabled attributes from
 * every element in the group
 */
function disableButton(group, btn) {

  for(let b of group) {
    if (btn === b)
      b.setAttribute('disabled', 'true');
    else if (b.disabled === true) {
      b.removeAttribute('disabled');
    }
  }
}

const sitTimer = document.getElementById('sitting-timer');
const standTimer = document.getElementById('standing-timer');

/**
 * Remove the styling class associated with the currently running timer
*/
function removeRunTimerStyling() {
  sitTimer.classList.remove('running');
  standTimer.classList.remove('running');
}


// emit ping when the window is ready
window.onload = () => {
  ipcRenderer.send('index: ready', null);
}

// Listeners for emitted messages

ipcRenderer.on('init-timer-states', (e, req) => {
  document.getElementById(req.orientation).setAttribute('disabled', 'true');
  document.getElementById(req.timerState).setAttribute('disabled', 'true');
});

ipcRenderer.on('timer: sitting', (e, elapsed) => {
  sitTimer.classList.add('running');
  sitTimer.innerText = elapsed;
});
ipcRenderer.on('timer: standing', (e, elapsed) => {
  standTimer.classList.add('running');
  standTimer.innerText = elapsed;
});


addListeners('orientation');
addListeners('timer-state');
