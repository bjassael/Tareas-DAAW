function ProgressBar() {
  let progress = 0;
  const progressBarE = document.getElementById("progress");

  function increment(incrementValue) {
    progress = Math.min(progress + incrementValue, MAX_ROUND_TIME);
    progressBarE.style.width = `${(progress / MAX_ROUND_TIME) * 100}%`;
  }

  function getProgress() {
    return progress;
  }
  function reset() {
    progress = 0;
  }

  return {
    increment,
    getProgress,
    reset
  };
}
