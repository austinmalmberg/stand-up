const Timer = require('./timer');

class Controller {

  constructor(current=null) {
    /**
     * An object that stores a new Timer object for each orientation (sitting,
     * standing, paused)
     */
    this.orientationTimers = {
      sitting: new Timer(),
      standing: new Timer(),
      paused: new Timer()
    }

    /**
     * Stores a string value that matches an orientation timer key which
     * represent the current orientation
     */
    this.current = current || this.getOrientations()[0];

    /**
     * A variable to determine whether a orientation timer is currently running
     */
    this.running = false;
  }

  /**
   * Binds the callback for a given orientation timer
   */
  bindCallback(orientation, callback) {
    if (!this.getOrientations().includes(orientation))
      return false;

    this.orientationTimers[orientation].bind(callback);
    return true;
  }

  handleOrientation(orientation) {

    if (orientation == this.current)
      return false;
    else if (!this.getOrientations().includes(orientation))
      return false;

    // stop the current timer
    this.orientationTimers[this.current].stop();

    // replace the current timer
    this.current = orientation;

    // start the new timer if running
    if (this.running)
      this.orientationTimers[this.current].start();

    return true;
  }

  handleTimerState(timerState) {

    if (timerState === 'started' && this.running)
      return false;
    else if (timerState === 'stopped' && !this.running)
      return false;

    if (timerState === 'started') {

      this.running = true;
      this.orientationTimers[this.current].start();

    } else if (timerState === 'stopped') {

      this.running = false;
      this.orientationTimers[this.current].stop();
    }

    return true;
  }

  stopAllTimers() {
    [...Object.keys(this.orientationTimers)].forEach(orientation => this.orientationTimers[orientation].stop());
  }

  getCurrentOrientation() {
    return this.current;
  }

  getTimerState() {
    return (this.running) ? 'started' : 'stopped';
  }

  getOrientations() {
    return [...Object.keys(this.orientationTimers)];
  }
}

module.exports = Controller;
