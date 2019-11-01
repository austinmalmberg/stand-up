
const CLASS_TO_TOGGLE = 'active';

class Controller {

  constructor() {

    this.toggles = {/*
      toggle.id: <id of currently active element>
    */};

    this.session = new Session();
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
    toggleIndicator.innerText = option.id.toUpperCase();

    if (this.timerOn())
      this.session.postActivity();

    // update the toggle
    this.toggles[toggle.id] = option.id;

    // start a new activity if the timer is still on
    if (this.timerOn())
        this.session.beginActivity(this.currentOrientation());

    this.updateTimers();
  }

  timerOn() {
    return this.toggles['timer'] === 'on';
  }

  currentOrientation() {
    return this.toggles['orientation'];
  }

  updateTimers() {
    const elapsed = this.session.elapsed();

    [...document.getElementById('orientation').children].forEach(element => {

      const activeOrientation = this.currentOrientation() === element.id;
      let time = this.session.get(element.id);

      if (activeOrientation)
        time += elapsed;

      element.innerText = msAsString(time);
    });

    document.getElementById('on').innerText = msAsString(this.session.total() + elapsed);
  }
}

/****** ON SCRIPT LOAD *******/

const controller = new Controller();

// add click listeners and register each toggle in the controller
[...document.getElementsByClassName('toggle')].forEach( toggle => {
  addOnClickListener(toggle);
  controller.registerToggle(toggle);
});

setInterval(() => controller.updateTimers(), 1000);


/******* VIEW FUNCTIONS *******/

function addOnClickListener(toggle) {
  toggle.onclick = () => {
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
