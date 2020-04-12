const { fromEvent } = rxjs;

var globalMax = 0;

function setRandomImage() {
  const imageE = document.getElementById("guess-image");
  const selectedImage = RandomChoice(imagesData);
  imageE.src = selectedImage.path;
  return selectedImage.name;
}

function getRandomName(set, exclude) {
  filteredSet = set.filter((imgData) => !exclude.includes(imgData.name));
  return RandomChoice(filteredSet).name;
}

function setRandomOptions(correctGuess) {
  const usedOptions = [correctGuess];
  const correctGuessPosition = Math.floor(Math.random() * 4) + 1;
  for (let position = 1; position < 5; position++) {
    let guess = getRandomName(imagesData, usedOptions);
    if (position === correctGuessPosition) {
      guess = correctGuess;
    } else {
      usedOptions.push(guess);
    }
    document.getElementById(`guess${position}`).innerText = guess;
  }
}

function Game() {
  let progressBar = ProgressBar();
  let gameTimer = null;
  let paused = false;
  let score = 0;
  let exit = false;

  function setInitialGame() {
    correctGuess = setRandomImage();
    setRandomOptions(correctGuess);
  }

  function init() {
    score = 0;
    exit = false;
    setInitialGame();
    gameTimer = Timer(roundLoop, ROUND_INCREMENT);
    gameTimer.init();
  }

  const roundLoop = () => {
    progressBar.increment(ROUND_INCREMENT);

    if (progressBar.getProgress() === MAX_ROUND_TIME) {
      updateScore(PENALTY_SCORE_FOR_EXCEED_MAX_TIME);
      correctGuess = setRandomImage();
      setRandomOptions(correctGuess);
      progressBar.reset();
    }

    guessOption(correctGuess);

    // For seeing round time seconds in the UI
    document.getElementById(
      `seconds`
    ).innerText = progressBar.getProgress().toFixed(1);

    if (exit) {
      return null;
    }
  };

  function pause() {
    gameTimer && gameTimer.pause();
  }

  function start() {
    gameTimer && gameTimer.start();
  }

  function stop() {
    gameTimer.stop();
    gameTimer = null;
    progressBar.reset();
    document.getElementById("progress").style.width = `0%`;
    // progressBar = null;
    paused = false;
    document.getElementById(`last-round`).innerText = score;
    score = 0;
    exit = true;
    document.getElementById(`score`).innerText = score;
    document.getElementById(`seconds`).innerText = 0;
    document.getElementById("guess-image").src =
      "http://icons.iconarchive.com/icons/danleech/simple/1024/dribbble-icon.png";
    for (let position = 1; position < 5; position++) {
      document.getElementById(`guess${position}`).innerText = "";
    }
  }

  function toggleGame() {
    paused ? start() : pause();
    paused = !paused;
  }

  function guessOption(correctGuess) {
    if (!exit) {
      // grab button reference
      const option1 = document.getElementById("guess1");
      const option2 = document.getElementById("guess2");
      const option3 = document.getElementById("guess3");
      const option4 = document.getElementById("guess4");

      // create an observable of button clicks
      const myObservable1 = fromEvent(option1, "click");
      const myObservable2 = fromEvent(option2, "click");
      const myObservable3 = fromEvent(option3, "click");
      const myObservable4 = fromEvent(option4, "click");

      const SubscriptionFunctionEvent = (event) => {
        if (paused) {
          return;
        }
        if (globalMax === 0) {
          console.log(correctGuess.toLowerCase());
          console.log(event.toElement.innerText.toLowerCase());
          console.log(
            event.toElement.innerText.toLowerCase() ===
              correctGuess.toLowerCase()
          );
          if (
            event.toElement.innerText.toLowerCase() ===
            correctGuess.toLowerCase()
          ) {
            updateScore(
              (SCORE_PER_CORRECT_ANSWER *
                (MAX_ROUND_TIME - progressBar.getProgress())) /
                MAX_ROUND_TIME
            );
            correctGuess = setRandomImage();
            setRandomOptions(correctGuess);
            progressBar.reset();
          } else {
            updateScore(PENALTY_SCORE_FOR_MISSING);
            correctGuess = setRandomImage();
            setRandomOptions(correctGuess);
            progressBar.reset();
          }
          globalMax += 1;
        }
      };

      const subscription1 = myObservable1.subscribe(SubscriptionFunctionEvent);
      const subscription2 = myObservable2.subscribe(SubscriptionFunctionEvent);
      const subscription3 = myObservable3.subscribe(SubscriptionFunctionEvent);
      const subscription4 = myObservable4.subscribe(SubscriptionFunctionEvent);
      globalMax = 0;
      // subscription1.unsubscribe();
      // subscription2.unsubscribe();
      // subscription3.unsubscribe();
      // subscription4.unsubscribe();
    }
  }

  function updateScore(val) {
    if (!exit) {
      score += val;
      document.getElementById(`score`).innerText = score.toFixed(2);
    }
  }

  return {
    init,
    isRunning: () => !!gameTimer,
    pause,
    start,
    stop,
    toggleGame
  };
}

const game = Game();

// helper

const RandomChoice = (choices) =>
  choices[Math.floor(Math.random() * choices.length)];
