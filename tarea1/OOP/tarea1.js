const _ = require("lodash");
const {
  splitParagraphInPhrases,
  splitTextInParagraph,
  divideText,
  splitTextBy
} = require("./utils");

const texto = `Filler text (also placeholder text or dummy text) is text that shares some characteristics\
of a real written text, but is random or otherwise generated. It may be used to\
display a sample of fonts, generate text for testing, or to spoof an e-mail spam filter. \
The process of using filler text is sometimes called greeking, although the text itself\
may be nonsense, or largely Latin, as in Lorem ipsum.\n\
ASDF is the sequence of letters that appear on the first four keys on the home row of a\
QWERTY or QWERTZ keyboard. They are often used as a sample or test case or as random,\
meaningless nonsense. It is also a common learning tool for keyboard classes,\
since all four keys are located on Home row.\n
I. should. not. appear. because. im. to. long (8 phrases).\n
Me. neither too short.(2 phrases)\n`;

// Settings
const M = 8; // Filter paragraph with more than M phrases
const N = 2; // Filter paragraph with less than N phrases

const phraseTraillingWhiteSpaces = 4;
// Cada frase debe comenzar con n espacios en blanco (después de un punto seguido)
// Cada párrafo debe tener n espacios de sangría
const addTraillingWhiteSpaces = (text, numberOfWhiteSpaces) =>
  " ".repeat(numberOfWhiteSpaces) + text.trimLeft();

// Cada párrafo debe estar separado por n líneas (después de un punto aparte)
const joinParagraphWithMultipleEmptyLines = (paragraphs, n) =>
  paragraphs.join("\n".repeat(n + 1));
// El ancho del texto debe ser a lo más n (sin cortar palabras)
const cutTextBeforeLastWord = (text, n) =>
  text
    .slice(0, n + 1)
    .split(" ")
    .reduce((prevValue, currentValue) =>
      `${prevValue} ${currentValue}`.length > n
        ? prevValue
        : `${prevValue} ${currentValue}`
    );
// Se ignoran los párrafos que tienen menos de n frases
const checkParagraphHasGEPhrases = (paragraph, n) => paragraph.length > n;
// Se ignoran los párrafos que tienen más de n frases
const checkParagraphHasLEPhrases = (paragraph, n) => paragraph.length <= n + 1;
// Solo las primeras n frases de cada párrafo
const getFirstNPhrases = (paragraph, n) => paragraph.slice(0, n);

// Transform Text
const transformedText = splitTextBy(texto, "\n")
  // Add sangría to paragraph
  .map(paragraph => addTraillingWhiteSpaces(paragraph, 4))
  // Split paragraph in phrases
  .map(paragraph => splitTextBy(paragraph, ". "))
  // Add sangría to phrases
  .map(paragraphList =>
    paragraphList.map(phrase => addTraillingWhiteSpaces(phrase, 4))
  )
  // Filter paragraphs with more than M phrases
  .filter(paragraphList => checkParagraphHasGEPhrases(paragraphList, M))
  // Filter paragraphs with less than N phrases
  .filter(paragraphList => checkParagraphHasLEPhrases(paragraphList, N))
  // Join paragraph phrases
  .map(paragraphList => paragraphList.join("."))
  // Join final text
  .join("\n");

console.log(transformedText);

module.exports = {
  addTraillingWhiteSpaces,
  joinParagraphWithMultipleEmptyLines,
  cutTextBeforeLastWord,
  checkParagraphHasGEPhrases,
  checkParagraphHasLEPhrases,
  getFirstNPhrases
};
