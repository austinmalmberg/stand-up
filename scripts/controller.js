const Timer = require('./timer');

class Controller {

  constructor(current=null) {
    this.stateTimers = {
      sit: new Timer(),
      stand: new Timer(),
      pause: new Timer()
    }
    this.current = current || this.getAllStates()[0];
    this.running = false;
  }

  bindCallback(timerId, callback) {
    if (!this.getAllStates().includes(timerId)) return;

    this.stateTimers[timerId].bind(callback);
  }

  handleState(timerId) {

    if (timerId == this.current) return;
    else if (!this.getAllStates().includes(timerId)) return;

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


    }
  }

  stopAllTimers() {
    [...Object.keys(this.stateTimers)].forEach(state => this.stateTimers[state].stop());
  }

  getState() {
    return this.current;
  }

  getStatus() {
    return (this.running) ? 'start' : 'stop';
  }

  getAllStates() {
    return [...Object.keys(this.stateTimers)];
  }
}

module.exports = Controller;
