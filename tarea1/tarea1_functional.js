const _ = require("lodash");

// Pipe from here:
// https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Splits
const curriedSplitter = _.curry((char, text) => text.split(char));
const splitTextInParagraphs = curriedSplitter("\n");
const splitParagraphInPhrases = curriedSplitter(".");
const splitParagraphsInPhrases = paragraphs => paragraphs.map(p => splitParagraphInPhrases(p));
const splitTextInPhrases = text => pipe(splitTextInParagraphs, splitParagraphsInPhrases)(text);

// Joins
const curriedJoin = _.curry((char, list) => list.join(char));
const joinParagraphPhrases = paragraph => curriedJoin(".")(paragraph);
const joinPhrasesToParagraphsList = paragraphs => paragraphs.map(p => joinParagraphPhrases(p));
const joinParagraphsToText = paragraphs => curriedJoin("\n")(paragraphs);
const joinPhrasesToText = phrases => pipe(joinPhrasesToParagraphsList, joinParagraphsToText)(phrases);

// Functions
// Add trailing WhiteSpaces

const addTrailingWhiteSpaces = (numberOfWhiteSpaces, text) =>
  " ".repeat(numberOfWhiteSpaces) + text.trimLeft();

const addTrailingWhiteSpacesToParagraphs = (numberOfWhiteSpaces, paragraph) =>
  paragraph.map(phrase => addTrailingWhiteSpaces(numberOfWhiteSpaces, phrase));

const addTrailingWhiteSpacesToPhrases = (numberOfWhiteSpaces, text) =>
  text.map(paragraph =>
    addTrailingWhiteSpacesToParagraphs(numberOfWhiteSpaces, paragraph)
  );

const addTrailingWhiteSpacesToPhrasesCurried = _.curry(
  addTrailingWhiteSpacesToPhrases
);
const addTrailingWhiteSpacesToParagraphsCurried = _.curry(
  addTrailingWhiteSpacesToParagraphs
);

function setTrailingWhiteSpacesForPhrases(text, numberOfWhiteSpaces) {
  return pipe(
    splitTextInPhrases,
    addTrailingWhiteSpacesToPhrasesCurried(numberOfWhiteSpaces),
    joinPhrasesToText
  )(text);
}

function setTrailingWhiteSpacesForParagraphs(text, numberOfWhiteSpaces) {
  return pipe(
    splitTextInParagraphs,
    addTrailingWhiteSpacesToParagraphsCurried(numberOfWhiteSpaces),
    joinParagraphsToText
  )(text);
}

// Filter Text Paragraphs length

function filterParagraphsWithLessThan(minPhrases, paragraphs) {
  return paragraphs.filter(paragraph => minPhrases + 1 <= paragraph.length);
}

function filterParagraphsWithMoreThan(maxPhrases, paragraphs) {
  return paragraphs.filter(paragraph => paragraph.length <= maxPhrases + 1);
}

const filterParagraphWithLessThanCurried = _.curry(
  filterParagraphsWithLessThan
);
const filterParagraphsWithMoreThanCurried = _.curry(
  filterParagraphsWithMoreThan
);

function setParagraphsWithLessThanPhrases(text, minPhrases) {
  return pipe(
    splitTextInPhrases,
    filterParagraphWithLessThanCurried(minPhrases),
    joinPhrasesToText
  )(text);
}

function setParagraphsWithMoreThanPhrases(text, maxPhrases) {
  return pipe(
    splitTextInPhrases,
    filterParagraphsWithMoreThanCurried(maxPhrases),
    joinPhrasesToText
  )(text);
}

function splitPhrasesInParagraph(text) {
  return pipe(
    splitTextInPhrases,
    joinPhrasesToParagraphsList,
    curriedJoin("")
  )(text);
}

function splitParagraphWithMultipleEmptyLines(text, numberOfLines) {
  return pipe(
    splitTextInParagraphs,
    curriedJoin("\n".repeat(numberOfLines + 1))
  )(text);
}

// First N Phrases

const getFirstNPhrases = (n, paragraph) => paragraph.slice(0, n);
const getFirstNPhrasesCurried = _.curry(getFirstNPhrases);

function setFirstNPhrases(text, maxPhrases) {
  return pipe(
    splitTextInParagraphs,
    getFirstNPhrasesCurried(maxPhrases),
    joinParagraphsToText
  )(text);
}

// Cut Phrases with max length

function joinWordsTillNChar(n, words) {
  return words.reduce((prevValue, currentValue) =>
    `${prevValue} ${currentValue}`.length > n
      ? prevValue
      : `${prevValue} ${currentValue}`
  );
}

const joinWordsTillNCharCurried = _.curry(joinWordsTillNChar);

function cutTextBeforeLastWord(text, maxLength) {
  return pipe(curriedSplitter(" "), joinWordsTillNCharCurried(maxLength))(text);
}

// Currying functions with one parameter and
// using them in a Pipe

const text =
  "      Frase1. Frase2. Frase3. Frase4.\n \
Parrafo2. Parrafo2. Parrafo2. Parrafo2.\
\n Parrafo3. Parrafo3. Parrafo3. Parrafo3. \
\n Parrafo4. Parrafo4. Parrafo4. Parrafo4.";

const NUMBER_TRAILING_FOR_PHRASES = 3;
const NUMBER_TRAILING_FOR_PARAGRAPH = 10;
const NUMBER_LESS = 0;
const NUMBER_MORE = 10;
const NUMBER_PARAGRAPH_LINES = 3;
const NUMBER_OF_PHRASES = 3;
const NUMBER_BEFORE_LAST_WORD = 100;

const curriedSetTrailingWhiteSpacesForPhrases = _.curry(text =>
  setTrailingWhiteSpacesForPhrases(text, NUMBER_TRAILING_FOR_PHRASES)
);
const curriedSetTrailingWhiteSpacesForParagraphs = _.curry(text =>
  setTrailingWhiteSpacesForParagraphs(text, NUMBER_TRAILING_FOR_PARAGRAPH)
);
const curriedSetParagraphsWithLessThanPhrases = _.curry(text =>
  setParagraphsWithLessThanPhrases(text, NUMBER_LESS)
);
const curriedSetParagraphsWithMoreThanPhrases = _.curry(text =>
  setParagraphsWithMoreThanPhrases(text, NUMBER_MORE)
);
const curriedSplitParagraphWithMultipleEmptyLines = _.curry(text =>
  splitParagraphWithMultipleEmptyLines(text, NUMBER_PARAGRAPH_LINES)
);
const curriedSetFirstNPhrases = _.curry(text =>
  setFirstNPhrases(text, NUMBER_OF_PHRASES)
);
const curriedCutTextBeforeLastWord = _.curry(text =>
  cutTextBeforeLastWord(text, NUMBER_BEFORE_LAST_WORD)
);



// EXAMPLES


// Ex1: All functions piped
console.log("Pipe #1\n");
console.log(
  pipe(
    curriedSetTrailingWhiteSpacesForPhrases,
    curriedSetTrailingWhiteSpacesForParagraphs,
    curriedSetParagraphsWithLessThanPhrases,
    curriedSetParagraphsWithMoreThanPhrases,
    curriedSplitParagraphWithMultipleEmptyLines,
    curriedSetFirstNPhrases,
    curriedCutTextBeforeLastWord
  )(text)
);

// Ex2: Another Example
console.log("Pipe #2\n");

function memoryTextLogger(initialValue) {
  return (text1) => {
    initialValue += 1;
    console.log(`Operation ${initialValue}\n:`, text1, '\n');
    return text1;
  }
}

const memoryLog0 = memoryTextLogger(0);

console.log('Final Text: \n',
  pipe(
    splitTextInParagraphs,
    addTrailingWhiteSpacesToParagraphsCurried(NUMBER_TRAILING_FOR_PARAGRAPH),
    memoryLog0,
    splitParagraphsInPhrases,
    memoryLog0,
    filterParagraphWithLessThanCurried(NUMBER_LESS),
    memoryLog0,
    filterParagraphsWithMoreThanCurried(NUMBER_MORE),
    memoryLog0,
    getFirstNPhrasesCurried(NUMBER_OF_PHRASES),
    memoryLog0,
    addTrailingWhiteSpacesToPhrasesCurried(NUMBER_TRAILING_FOR_PHRASES),
    memoryLog0,
    joinPhrasesToText,
  )(text)
)
