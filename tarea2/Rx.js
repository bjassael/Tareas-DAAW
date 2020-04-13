const { fromEvent } = rxjs;
const { filter, tap } = rxjs.operators;

const handleKeyDown = (event) => {
  const keyName = event.key;
  document.getElementById(KEY_BUTTONS[keyName]).classList.add("active");
};

const handleKeyUp = (event) => {
  const keyName = event.key;
  document.getElementById(KEY_BUTTONS[keyName]).classList.remove("active");
};

const keyDownObservable$ = fromEvent(document, "keydown").pipe(
  filter((event) => Object.keys(KEY_BUTTONS).includes(event.key)),
  tap(handleKeyDown)
);

const keyUpObservable$ = fromEvent(document, "keyup")
  .pipe(filter((event) => Object.keys(KEY_BUTTONS).includes(event.key)))
  .subscribe(handleKeyUp);
