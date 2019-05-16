const Timer = require('./timer');
const { logTimerData } = require('./logger');

const states = ['sit', 'stand', 'pause'];

class Controller {

  constructor(current) {
    this.stateTimers = {
      sit: new Timer(),
      stand: new Timer(),
      pause: new Timer()
    }
    this.current = current || states[0];
    this.running = false;
  }

  bindCallback(timerId, callback) {
    if (!states.includes(timerId)) return;

    this.stateTimers[timerId].bind(callback);
  }

  handleState(timerId) {

    if (timerId == this.current) return;
    else if (!states.includes(timerId)) return;

    // stop the current timer
    this.stateTimers[this.current].stop();

    // replace the current timer
    this.current = timerId;

    if (this.running) {
      this.stateTimers[this.current].start();
    }
  }

  handleTimer(timerId) {

    if (timerId === 'start' && this.running) return;
    else if (timerId === 'stop' && !this.running) return;

    if (timerId === 'start') {

      this.running = true;
      this.stateTimers[this.current].start();

    } else if (timerId === 'stop') {

      this.running = false;
      this.stateTimers[this.current].stop();
      logTimerData(this.stateTimers);

    }
  }

  getState() {
    return this.current;
  }

  getStatus() {
    return (this.running) ? 'start' : 'stop';
  }
}

module.exports = { states, Controller };
