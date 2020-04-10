
const handleKeyPress = (event) => {
  const keyName = event.key;

  if (keyName === 's') {
    // Check if the game is already running
    if (!game.isRunning()) {
      game.init();
    }
  } else if (keyName === ' ') {
    game.toggleGame();
  }

}

document.addEventListener('keypress', handleKeyPress);

