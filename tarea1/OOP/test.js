const {
  addTraillingWhiteSpaces,
  joinParagraphWithMultipleEmptyLines,
  cutTextBeforeLastWord,
  checkParagraphHasGEPhrases,
  checkParagraphHasLEPhrases,
  getFirstNPhrases
} = require("./tarea1");

const phrase = " Frase1. Frase2.\n Parrafo2.\n";
const n = 8;
const parragraphList = [" Frase1. Frase2.", " Parrafo2.", ""];
const parragraph = [" Frase1", " Frase2"];

const test_addTraillingWhiteSpaces = () =>
  addTraillingWhiteSpaces(phrase, n) ===
  "        Frase1. Frase2.\n Parrafo2.\n";

const test_joinParagraphWithMultipleEmptyLines = () =>
  joinParagraphWithMultipleEmptyLines(parragraphList, n) ===
  " Frase1. Frase2.\n\n\n\n\n\n\n\n\n Parrafo2.\n\n\n\n\n\n\n\n\n";

const test_cutTextBeforeLastWord = () =>
  cutTextBeforeLastWord(phrase, n) === " Frase1." &&
  cutTextBeforeLastWord(phrase, 10) === " Frase1." &&
  cutTextBeforeLastWord(phrase, 9) === " Frase1." &&
  cutTextBeforeLastWord(phrase, 7) === "" &&
  cutTextBeforeLastWord(phrase, 2) === "";

const test_checkParagraphHasGEPhrases = () =>
  checkParagraphHasGEPhrases(parragraph, n) === false;

const test_checkParagraphHasLEPhrases = () =>
  checkParagraphHasLEPhrases(parragraph, n) === true;

// const test_splitPhrasesInParagraph

console.log("test_addTraillingWhiteSpaces: ", test_addTraillingWhiteSpaces());
console.log(
  "test_joinParagraphWithMultipleEmptyLines: ",
  test_joinParagraphWithMultipleEmptyLines()
);
console.log("test_cutTextBeforeLastWord: ", test_cutTextBeforeLastWord());
console.log(
  "test_checkParagraphHasGEPhrases: ",
  test_checkParagraphHasGEPhrases()
);
console.log(
  "test_checkParagraphHasLEPhrases: ",
  test_checkParagraphHasLEPhrases()
);
