
class Timer {
  constructor(start, stop) {
    this.start = start || Date.now();
    this.end = stop || null;
  }

  running() {
    return this.end === null;
  }

  stop() {
    if (!this.end) {
      this.end = Date.now();
      return true;
    }

    return false;
  }

  elapsed() {
    if (this.end) return this.end - this.start;

    return Date.now() - this.start;
  }

  static toSecs(millis=undefined) {
    if (millis)
      return millis / 1000;

    else if (this.start)
      return this.elapsed() / 1000;

    return undefined;
  }
}

module.exports = Timer;
