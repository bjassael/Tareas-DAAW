// const handleKeyDown = (event) => {
//   const keyName = event.key;
//   if (keyName === "a") {
//     document.getElementById("myBtnA").classList.add("active");
//   }
//   if (keyName === "s") {
//     document.getElementById("myBtnS").classList.add("active");
//   }
//   if (keyName === "d") {
//     document.getElementById("myBtnD").classList.add("active");
//   }
//   if (keyName === "f") {
//     document.getElementById("myBtnF").classList.add("active");
//   }
// }

// const handleKeyUp = (event) => {
//   const keyName = event.key;

//   if (keyName === "a") {
//     document.getElementById("myBtnA").classList.remove("active");
//   }
//   if (keyName === "s") {
//     document.getElementById("myBtnS").classList.remove("active");
//   }
//   if (keyName === "d") {
//     document.getElementById("myBtnD").classList.remove("active");
//   }
//   if (keyName === "f") {
//     document.getElementById("myBtnF").classList.remove("active");
//   }

// }


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

// document.addEventListener("keydown", handleKeyDown);
// document.addEventListener("keyup", handleKeyUp);

document.addEventListener("keypress", handleKeyPress);
