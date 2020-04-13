const { fromEvent, interval } = rxjs;
const { pipe, filter, merge, map, tap, throttle } = rxjs.operators;

const handleKeyDown = (event) => {
  const keyName = event.key;
  const pressedKey = document.getElementById(KEY_BUTTONS[keyName]);
  pressedKey.classList.add("active");
  const guessOptionId = pressedKey.dataset.option;
  document.getElementById(guessOptionId).classList.add("active");
};

const handleKeyUp = (event) => {
  const keyName = event.key;
  const pressedKey = document.getElementById(KEY_BUTTONS[keyName]);
  pressedKey.classList.remove("active");
  const guessOptionId = pressedKey.dataset.option;
  document.getElementById(guessOptionId).classList.remove("active");
};

const keyDownObservable$ = fromEvent(document, "keydown").pipe(
  filter((event) => Object.keys(KEY_BUTTONS).includes(event.key)),
  tap(handleKeyDown)
);

const keyUpObservable$ = fromEvent(document, "keyup")
  .pipe(filter((event) => Object.keys(KEY_BUTTONS).includes(event.key)))
  .subscribe(handleKeyUp);
