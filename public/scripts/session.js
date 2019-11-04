/**
 * The model is responsible for managing the timers object.
 */

class Session {

  constructor(keys=[]) {
    this.timers = {/*
      sitting: [],
      standing: []
    */
    };

    keys.forEach(key => this.timers[key] = []);

    this.activity = null;
  }

  beginActivity(name) {
    this.activity = new Activity(name);
  }

  endActivity() {
    if (!this.activity)
      return false;

    this.activity.stop();

    if (this.timers.hasOwnProperty(this.activity.name))
      this.timers[this.activity.name].push(this.activity.elapsed());
    else {
      this.timers[this.activity.name] = [this.activity.elapsed()];
    }

    this.activity = null;

    return true;
  }

  /**
   * Recursive function that returns the elapsed time (in ms) spent in the given
   * activity. If a name is omitted, returns the elapsed time spent in the
   * current session.
   */
  elapsed(activityName) {

    let total = 0;

    if (activityName) {

      if (this.timers.hasOwnProperty(activityName))
        total += this.timers[activityName].reduce((t, ms) => t + ms, 0);

      if (this.activity && this.activity.name === activityName) {
        total += this.activity.elapsed();
      }

    } else {

      for (let timer of Object.keys(this.timers)) {
        total += this.timers[timer].reduce((t, ms) => t + ms, 0);
      }

      if (!this.timers.hasOwnProperty(activityName) && this.activity) {
        total += this.activity.elapsed();
      }
    }

    return total;
  }
}



class Activity {
  constructor(name, start, end) {
    this.name = name;
    this.start = start || Date.now();
    this.end = end || null;
  }

  stop() {
    if (!this.end)
      this.end = Date.now();

    return this.elapsed();
  }

  elapsed() {
    if (this.end)
      return this.end - this.start;

    return Date.now() - this.start;
  }
}
