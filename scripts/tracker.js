const Timer = require('./timer');

const states = ['sit', 'stand', 'pause'];

class Tracker {

  constructor(current) {
    this.stateTimers = {
      sit: new Timer(),
      stand: new Timer(),
      pause: new Timer()
    }
    this.current = current || states[0];
    this.running = false;
  }

  bindCallback(elementId, callback) {

    if (!states.includes(elementId)) {
      console.log(`I don't know how you did it, but ${elementId} isn't one of the states.`);
      return;
    }

    console.log(`${elementId} button bound with ${callback}`);
    this.stateTimers[elementId].bind(callback);
  }

  handleState(elementId) {

    if (!this.running) {
      console.log(`Timers aren't running!`);
      return;
    }
    else if (elementId == this.current) {
      console.log(`Already using ${this.current} timer.`);
      return;
    }
    else if (!states.includes(elementId)) {
      console.log(`I don't know how you did it, but ${elementId} isn't one of the states.`);
      return;
    }

    // stop the current timer
    this.stateTimers[this.current].stop();

    // replace the current timer then start it
    this.current = elementId;
    this.stateTimers[this.current].start();
  }

  handleTimer(elementId) {

    if (elementId === 'start' && this.running) {
      console.log(`${this.current} timer is already running!`);
      return;
    }
    else if (elementId === 'stop' && !this.running) {
      console.log(`${this.current} timer already stopped!`);
      return;
    }

    if (elementId === 'start') {
      this.running = true;
      this.stateTimers[this.current].start();
      console.log(`${this.current} timer started!`);
    }
    else if (elementId === 'stop') {
      this.running = false;
      this.stateTimers[this.current].stop();
      console.log(`${this.current} timer stopped!`);
    }
  }
}

module.exports = { states, Tracker };
