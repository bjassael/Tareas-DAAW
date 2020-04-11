function ProgressBar() {
  let progress = 0;
  const progressBarE = document.getElementById("progress");

  function increment(incrementValue) {
    progress = Math.min(progress + incrementValue, 100);
    progressBarE.style.width = `${progress}%`;
  }

  function reset() {
    progress = 0;
  }

  return {
    increment,
    reset,
  };
}
