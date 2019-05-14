const Timer = require('./timer');
const { log, setThreshold } = require('./logger');

const states = {
  SITTING: 0,
  STANDING: 1,
  PAUSED: 2
}

class OrientationTracker {
  constructor(state, started) {
    this.state = state || states.SITTING;
    this.started = started || true;
    this.stateTimer = (this.started ? new Timer() : null);

    setThreshold(5000);
  }

  start() {
    // do nothing if already started
    if (this.started) {
      console.log('already started!');
      return false;
    }

    this.started = true;
    this.stateTimer = new Timer();

    console.log('started.');
    return true;
  }

  stop() {
    // do nothing if not started
    if (!this.started) {
      console.log('already stopped!');
      return false;
    }

    if (this.stateTimer)
      this._logState();

    this.started = false;
    this.stateTimer = null;

    console.log('stopped.');
    return true;
  }

  setState(newState) {
    if (!this.started) {
      console.log('must start before setting state.');
      return false;
    }

    if (this.state === newState) {
      console.log('already in that state.');
      return false;
    }

    this._logState();
    this.state = newState;
    this.stateTimer = new Timer();
    console.log('done.');
    return true;
  }

  timeInState() {
    return this.stateTimer.elapsed();
  }

  _logState() {
    if(this.started)
      log(this.state, this.stateTimer);
  }
}

module.exports = { states, OrientationTracker };
