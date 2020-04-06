
function ProgressBar() {
  let progress = 0;
  const incrementValue = 0.1;
  const progressBarE = document.getElementById('progress');
  progressBarE.style.width = `${progress}%`;

  function run() {
    progress === 100 ? reset() : increment();
  }

  function increment() {
    progress = Math.min(progress + incrementValue, 100);
    progressBarE.style.width = `${progress}%`;
  }

  function reset() {
    progress = 0;
  }

  return {
    increment,
    run
  }

}

function Timer(intervalFunction) {
  let intervalID = null;

  const intervalTimer = () => {
    intervalID = setInterval(intervalFunction, 10);
  };

  return {
    start: intervalTimer,
    stop: () => clearInterval(intervalID),
  }
}

function Game() {
  const progressBar = ProgressBar();
  const timer = Timer(progressBar.run);
  timer.start();
}

Game();
