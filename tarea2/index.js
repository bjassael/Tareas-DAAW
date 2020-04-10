const imagesData = [{"name":"Jabba the Hut","path":"./icons/Jabba the Hut.png"},{"name":"Padme amidala","path":"./icons/Padme amidala.png"},{"name":"afro","path":"./icons/afro.png"},{"name":"ant man","path":"./icons/ant man.png"},{"name":"antenna","path":"./icons/antenna.png"},{"name":"ariel","path":"./icons/ariel.png"},{"name":"bald hero","path":"./icons/bald hero.png"},{"name":"batman","path":"./icons/batman.png"},{"name":"bb-8","path":"./icons/bb-8.png"},{"name":"beast","path":"./icons/beast.png"},{"name":"belle","path":"./icons/belle.png"},{"name":"ben kenobi","path":"./icons/ben kenobi.png"},{"name":"bob","path":"./icons/bob.png"},{"name":"bounty hunter","path":"./icons/bounty hunter.png"},{"name":"c-3po","path":"./icons/c-3po.png"},{"name":"c3po","path":"./icons/c3po.png"},{"name":"capitan america","path":"./icons/capitan america.png"},{"name":"chewbacca","path":"./icons/chewbacca.png"},{"name":"cinderella","path":"./icons/cinderella.png"},{"name":"clone","path":"./icons/clone.png"},{"name":"cyclops","path":"./icons/cyclops.png"},{"name":"daredevil","path":"./icons/daredevil.png"},{"name":"darth sidious","path":"./icons/darth sidious.png"},{"name":"darth vader","path":"./icons/darth vader.png"},{"name":"deadpool","path":"./icons/deadpool.png"},{"name":"dracula","path":"./icons/dracula.png"},{"name":"flash","path":"./icons/flash.png"},{"name":"frankenstein","path":"./icons/frankenstein.png"},{"name":"freddy krueger","path":"./icons/freddy krueger.png"},{"name":"frodo","path":"./icons/frodo.png"},{"name":"galadriel","path":"./icons/galadriel.png"},{"name":"gandalf","path":"./icons/gandalf.png"},{"name":"gollum","path":"./icons/gollum.png"},{"name":"groot","path":"./icons/groot.png"},{"name":"han solo","path":"./icons/han solo.png"},{"name":"hawkeye","path":"./icons/hawkeye.png"},{"name":"hipster boy","path":"./icons/hipster boy.png"},{"name":"hipster girl","path":"./icons/hipster girl.png"},{"name":"iron man","path":"./icons/iron man.png"},{"name":"jasmine","path":"./icons/jasmine.png"},{"name":"jawa","path":"./icons/jawa.png"},{"name":"joda","path":"./icons/joda.png"},{"name":"john lennon","path":"./icons/john lennon.png"},{"name":"joker","path":"./icons/joker.png"},{"name":"kevin","path":"./icons/kevin.png"},{"name":"legolas","path":"./icons/legolas.png"},{"name":"luke skywalker","path":"./icons/luke skywalker.png"},{"name":"magneto","path":"./icons/magneto.png"},{"name":"megaman","path":"./icons/megaman.png"},{"name":"princess leia","path":"./icons/princess leia.png"},{"name":"r2d2","path":"./icons/r2d2.png"},{"name":"rey","path":"./icons/rey.png"},{"name":"sonic","path":"./icons/sonic.png"},{"name":"spiderman","path":"./icons/spiderman.png"},{"name":"storm trooper","path":"./icons/storm trooper.png"},{"name":"stuart","path":"./icons/stuart.png"},{"name":"superman","path":"./icons/superman.png"},{"name":"thanos","path":"./icons/thanos.png"},{"name":"thor","path":"./icons/thor.png"},{"name":"tupac","path":"./icons/tupac.png"},{"name":"whitesnow","path":"./icons/whitesnow.png"},{"name":"wolverine","path":"./icons/wolverine.png"},{"name":"wonder woman","path":"./icons/wonder woman.png"}];


function setRandomImage() {
  const imageE = document.getElementById('guess-image');
  const selectedImage = imagesData[Math.floor(Math.random() * imagesData.length)]
  imageE.src = selectedImage.path;
  return selectedImage.name; 
}

function getRandomName(set, exclude) {
  filteredSet = set.filter((imgData) => !exclude.includes(imgData.name));
  return filteredSet[Math.floor(Math.random() * filteredSet.length)].name;
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
  const progressBar = ProgressBar();
  let gameTimer = null;
  let paused = false;

  // in milliseconds
  let roundProgress = 0;
  const roundIncrement = 10;
  const roundEndTime = 10000;

  function setInitialGame() {
    correctGuess = setRandomImage();
    setRandomOptions(correctGuess);
  }

  function init() {
    setInitialGame();
    gameTimer = Timer(roundLoop, roundIncrement);
    gameTimer.init();
  }

  const roundLoop = () => {

    progressBar.increment(roundIncrement/100);
    roundProgress += roundIncrement;

    if (roundProgress === roundEndTime) {
      const correctGuess = setRandomImage();
      setRandomOptions(correctGuess);
      roundProgress = 0;
      progressBar.reset();
    }

    // For seeing round time seconds in the UI
    document.getElementById(`seconds`).innerText = Math.round(roundProgress/100, 3)/10;
  }

  function pause() {
    gameTimer && gameTimer.pause();
  }

  function start() {
    gameTimer && gameTimer.start();
  }

  function toggleGame() {
    paused ? start() : pause();
    paused = !paused;
  }

  return { 
    init, 
    isRunning: () => !!gameTimer, 
    pause,
    start,
    toggleGame 
  }
}

const game = Game();

