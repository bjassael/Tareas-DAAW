

const handleKeyPress = (event) => {
  const keyName = event.key;

  if (keyName === " ") {
    // Check if the game is already running
    if (!game.isRunning()) {
      game.init();
    } else {
      event.preventDefault();
      game.toggleGame();
    }
  } else if (keyName === "q") {
    if (game.isRunning()) {
      game.stop();
    }
  }
};

document.addEventListener("keypress", handleKeyPress);
