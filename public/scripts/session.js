/**
 * The model is responsible for managing the sessionTimer object.
 */

class Session {

  constructor(keys=[]) {
    this.sessionTimer = {/*
      sitting: [],
      standing: []
    */
    };

    keys.forEach( key => {
      this.sessionTimer[key] = [];
    });

    this.activity = null;
  }

  beginActivity(name) {
    this.activity = {
      'name': name,
      start: Date.now()
    };

    console.log(`${Date.now()} : Started at ${this.activity.start}.`);
  }

  postActivity() {
    if (this.activity) {

      if (!this.sessionTimer[this.activity.name])
        this.sessionTimer[this.activity.name] = [];

      this.sessionTimer[this.activity.name].push(this.elapsed());

      console.log(`${Date.now()} : Posted for ${this.elapsed()} ms.`);

      this.activity = null;

      return true;
    }

    console.log(`${Date.now()} : Unable to post ${this.activity.name}`);
    return false;
  }

  getActivity() {
    return this.activity;
  }

  /**
   * Returns the elapsed time (in ms) spent in the given activity during this
   * session
   */
  get(name) {
    if (!this.sessionTimer[name])
      return 0;

    return this.sessionTimer[name]
        .reduce((total, curr) => total + curr, 0);
  }

  total() {
    return [...Object.keys(this.sessionTimer)]
        .reduce((total, activity) => total + this.get(activity), 0);
  }

  elapsed() {
    if (!this.activity)
      return 0;

    return Date.now() - this.activity.start;
  }
}
