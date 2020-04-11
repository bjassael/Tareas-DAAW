function Timer(intervalFunction, interval, args = null) {
  let intervalID = null;
  let pause = false;

  const pausedIntervalFunction = (args) => {
    return pause ? () => {} : intervalFunction(args);
  };

  const intervalTimer = () => {
    intervalID = setInterval(pausedIntervalFunction, interval, args);
  };

  return {
    init: intervalTimer,
    pause: () => (pause = true),
    start: () => (pause = false),
    stop: () => clearInterval(intervalID),
  };
}
