const Timer = require('./timer');
const log = require('./logger');

class OrientationTracker {
  constructor(state, status) {
    this.state = state || this.states.SITTING;
    this.status = status || this.statuses.STARTED;
    this.stateTimer = new Timer();

    this.prevActiveState = null;

    log.setThreshold(5000);
  }

  start() {
    // do nothing if already started
    if (this.status == this.statuses.STARTED) return false;

    this.status = this.statuses.STARTED;
    this.stateTimer = new Timer();
    return true;
  }

  stop() {
    // do nothing if not started
    if (this.status != this.statuses.STARTED)
      return false;

    _logState();
    this.stateTimer = null;
    return true;
  }

  flipActiveState() {
    if(this.state == this.states.PAUSED) return false;

    _setPrevActiveState();
    if (this.state == this.states.SITTING)
      this.state = this.states.STANDING;

    else if (this.state == this.states.STANDING)
      this.state = this.states.SITTING;

    return true;
  }

  pause() {
    if(this.state == this.states.PAUSED) return false;

    _logState();
    _setPrevActiveState();
    this.state = this.states.PAUSED;
    return true;
  }

  static get states() {
    return {
      SITTING: 0,
      STANDING: 1,
      PAUSED: 2
    }
  }

  static get statuses() {
    return {
      STARTED: 0,
      STOPPED: 1
    };
  }

  _logState() {
    logger.log(this.state, this.stateTimer);
  }

  _setPrevActiveState() {
    if(this.state != this.states.PAUSED)
      this.prevActiveState = this.state;
  }
}

module.exports = OrientationTracker;
