
const CLASS_TO_TOGGLE = 'active';

class Controller {

  constructor() {

    this.toggles = {/*
      toggle.id: <id of currently active element>
    */
    };

    this.session = new Session();
    this.interval = setInterval(() => this.updateTimers(), 250);
  }

  /**
   * Adds a toggle object to Controller.toggles where key=toggle.id and value=
   * the id of the (first) active element
   */
  registerToggle(toggle) {
    this.toggles[toggle.id] = toggle.getElementsByClassName(CLASS_TO_TOGGLE)[0].id;
  }

  toggleChanged(toggle, option) {

    // update toggle--indicator text
    const toggleContainer = toggle.parentElement;
    const toggleIndicator = toggleContainer.getElementsByClassName('toggle--indicator')[0];
    toggleIndicator.innerText = option.id;

    if (this.timerOn())
      this.session.endActivity();

    // update the toggle
    this.toggles[toggle.id] = option.id;

    // start a new activity if the timer is still on
    if (this.timerOn())
        this.session.beginActivity(this.currentOrientation());
  }

  timerOn() {
    return this.toggles['timer'] === 'on';
  }

  currentOrientation() {
    return this.toggles['orientation'];
  }

  updateTimers() {

    [...document.getElementById('orientation').children].forEach(element => {
        element.innerText = msToString(this.session.elapsed(element.id));
    });

    document.getElementById('on').innerText = msToString(this.session.elapsed());
  }
}

/****** ON SCRIPT LOAD *******/

const controller = new Controller();

// add click listeners and register each toggle in the controller
[...document.getElementsByClassName('toggle--container')].forEach( toggleContainer => {
  const toggle = toggleContainer.getElementsByClassName('toggle')[0];

  addOnClickListener(toggleContainer, toggle);
  controller.registerToggle(toggle);
});


/******* VIEW FUNCTIONS *******/

/**
 * Adds a click listener to the toggle container
 */
function addOnClickListener(toggleContainer, toggle) {
  toggleContainer.onclick = () => {
    // adds or removes the class based on whether the child currently has it
    [...toggle.children].forEach(toggleClass);
  };

  function toggleClass(option) {

    const containsToggleClass = option.classList.contains(CLASS_TO_TOGGLE);

    if (containsToggleClass)
      option.classList.remove(CLASS_TO_TOGGLE);

    else {
      option.classList.add(CLASS_TO_TOGGLE);
      controller.toggleChanged(toggle, option);
    }
  }
}
