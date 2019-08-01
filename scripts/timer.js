
class Timer {
  constructor() {
    this.secs = 0;
    this.tickerId = null;
    this.callback = console.log;
  }

  bind(callback) {
    this.callback = callback;
  }

  start() {
    this.callback(this.secs);
    this.tickerId = setInterval(() => this.callback(++this.secs), 1000);
  }

  stop() {
    clearInterval(this.tickerId);

    console.log(`${this.tickerId} stopped.`);

    return this.secs;
  }

  seconds() {
    return this.secs;
  }
}

module.exports = Timer;
