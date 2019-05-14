
class Timer {
  constructor(start, stop) {
    this.start = start || Date.now();
    this.stop = stop || null;
  }

  running() {
    return this.stop === null;
  }

  stop() {
    if (!this.stop) {
      this.stop = Date.now();
      return true;
    }

    return false;
  }

  elapsed() {
    if (this.stop) return this.stop - this.start;

    return Date.now() - this.start;
  }

  elapsedFormatted() {
    let formatted = {};
    let time = elapsed();

    formatted.secs = Math.floor(time / 1000);
  }
}

module.exports = Timer;
