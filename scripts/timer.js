
class Timer {
  constructor() {

    /**
     * A counter that gets incremented every 1000ms after the start function is 
     * called
     */
    this.elapsed = 0;

    /**
     * A reference to the tickerId that gets created by setInterval
     */
    this.tickerId = null;

    /**
     * A callback that fires each second the timer is running
    */
    this.callback = console.log;
  }

  /**
   * Bind a callback to the Timer object that will fire once when start() is
   * called and again each time the ticker increments
   */
  bind(callback) {
    this.callback = callback;
  }

  /**
   * Effectively starts the timer by incrementing a value every 1000ms. This
   * function also fires the callback once when the function is called and again
   * every interval
   */
  start() {
    this.callback(this.elapsed);
    this.tickerId = setInterval(() => this.callback(++this.elapsed), 1000);
  }

  /**
   * Stops the timer by clearing the interval and returns the number of seconds
   * on the timer. Since the elapsed time is only incremented every 1000ms, any
   * fractions of a second will lost when this method is called
   */
  stop() {
    if (this.tickerId)
      clearInterval(this.tickerId);
  }

  /**
   * Returns the total number of seconds that have elapsed while the timer was
   * started
   */
  seconds() {
    return this.elapsed;
  }
}

module.exports = Timer;
