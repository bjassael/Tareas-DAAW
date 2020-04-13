const { fromEvent } = rxjs;
const {
  filter,
  debounceTime,
  merge,
  distinctUntilChanged,
  first,
  map,
} = rxjs.operators;

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
  let scorePlayer1 = 0;
  let scorePlayer2 = 0;
  let exit = false;
  let correctGuess;

  function setInitialGame() {
    correctGuess = setRandomImage();
    setRandomOptions(correctGuess);
  }

  function init() {
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    exit = false;
    setInitialGame();
    gameTimer = Timer(roundLoop, ROUND_INCREMENT);
    gameTimer.init();
    guessOption();
  }

  const roundLoop = () => {
    progressBar.increment(ROUND_INCREMENT);

    if (progressBar.getProgress() === MAX_ROUND_TIME) {
      updateScorePlayer1(PENALTY_SCORE_FOR_EXCEED_MAX_TIME);
      updateScorePlayer2(PENALTY_SCORE_FOR_EXCEED_MAX_TIME);
      correctGuess = setRandomImage();
      setRandomOptions(correctGuess);
      progressBar.reset();
    }

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
    paused = false;
    document.getElementById("last-round-winner").innerText =
      scorePlayer1 > scorePlayer2 ? "P1" : "P2";
    document.getElementById("last-round-score").innerText =
      scorePlayer1 > scorePlayer2
        ? scorePlayer1.toFixed(2)
        : scorePlayer2.toFixed(2);
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    exit = true;
    document.getElementById("score-player-1").innerText = scorePlayer1;
    document.getElementById("score-player-2").innerText = scorePlayer2;
    document.getElementById("seconds").innerText = 0;
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

  function guessOption() {
    if (!exit) {
      const ObservablePlayer2Down = fromEvent(document, "keydown");
      ObservablePlayer2Down.pipe(
        filter((event) => Object.keys(PLAYER_2_KEYS).includes(event.key)),
        map((event) => PLAYER_2_KEYS[event.key])
      ).subscribe((event) => SubscriptionFunctionEvent(event, "player2"));
      const ObservablePlayer1Down = fromEvent(document, "keydown");
      ObservablePlayer1Down.pipe(
        filter((event) => Object.keys(PLAYER_1_KEYS).includes(event.key)),
        map((event) => PLAYER_1_KEYS[event.key])
      ).subscribe((event) => SubscriptionFunctionEvent(event, "player1"));

      function SubscriptionFunctionEvent(event, player) {
        const updateScore =
          player === "player1" ? updateScorePlayer1 : updateScorePlayer2;
        if (paused) {
          return;
        }
        if (event.innerText.toLowerCase() === correctGuess.toLowerCase()) {
          updateScore(
            (SCORE_PER_CORRECT_ANSWER *
              (MAX_ROUND_TIME - progressBar.getProgress())) /
              MAX_ROUND_TIME
          );
          if (!exit) {
            correctGuess = setRandomImage();
            setRandomOptions(correctGuess);
            progressBar.reset();
          }
        } else {
          if (!exit) {
            updateScore(PENALTY_SCORE_FOR_MISSING);
            correctGuess = setRandomImage();
            setRandomOptions(correctGuess);
            progressBar.reset();
          }
        }
      }
    }
  }

  function updateScorePlayer1(val) {
    if (!exit) {
      scorePlayer1 += val;
      document.getElementById(
        "score-player-1"
      ).innerText = scorePlayer1.toFixed(2);
    }
  }
  function updateScorePlayer2(val) {
    if (!exit) {
      scorePlayer2 += val;
      document.getElementById(
        "score-player-2"
      ).innerText = scorePlayer2.toFixed(2);
    }
  }

  return {
    init,
    isRunning: () => !!gameTimer,
    pause,
    start,
    stop,
    toggleGame,
  };
}

const game = Game();

// helper

const RandomChoice = (choices) =>
  choices[Math.floor(Math.random() * choices.length)];
