const {
  addTraillingWhiteSpaces,
  joinParagraphWithMultipleEmptyLines,
  cutTextBeforeLastWord,
  checkParagraphHasGEPhrases,
  checkParagraphHasLEPhrases,
  getFirstNPhrases
} = require("./tarea1");

class Text {
  constructor(text) {
    this.text = text;
  }

  setTraillingWhiteSpacesForPhrases(numberOfWhiteSpaces) {
    this.text = this.text
      .split("\n")
      .filter(paragraph => paragraph != "")
      .map(paragraph => paragraph.split(".").filter(phrase => phrase != ""))
      .map(paragraph =>
        paragraph.map(phrase =>
          addTraillingWhiteSpaces(phrase, numberOfWhiteSpaces)
        )
      )
      .map(paragraph => `${paragraph.join(".")}.`)
      .join("\n");
    return this;
  }

  setTraillingWhiteSpacesForParagraphs(numberOfWhiteSpaces) {
    this.text = this.text
      .split("\n")
      .filter(paragraph => paragraph != "")
      .map(paragraph => addTraillingWhiteSpaces(paragraph, numberOfWhiteSpaces))
      .join("\n");
    return this;
  }

  splitParagraphWithMultipleEmptyLines(numberOfLines) {
    this.text = joinParagraphWithMultipleEmptyLines(
      this.text.split("\n"),
      numberOfLines
    );
    return this;
  }

  cutTextBeforeLastWord(maxLength) {
    this.text = cutTextBeforeLastWord(this.text, maxLength);
    return this;
  }

  checkParagraphHasGEPhrases(minPhrases) {
    this.text = this.text
      .split("\n")
      .map(paragraph => paragraph.split("."))
      .filter(paragraph => checkParagraphHasGEPhrases(paragraph, minPhrases))
      .map(paragraph => paragraph.join("."))
      .join("\n");
    return this;
  }

  checkParagraphHasLEPhrases(minPhrases) {
    this.text = this.text
      .split("\n")
      .map(paragraph => paragraph.split("."))
      .filter(paragraph => checkParagraphHasLEPhrases(paragraph, minPhrases))
      .map(paragraph => paragraph.join("."))
      .join("\n");
    return this;
  }

  splitPhrasesInParagraph() {
    this.text = this.text
      .split("\n")
      .map(paragraph => paragraph.split("."))
      .map(paragraph => paragraph.join(".\n"))
      .join("");
    return this;
  }

  getFirstNPhrases(maxPhrases) {
    this.text = this.text
      .split("\n")
      .filter(paragraph => paragraph != "")
      .map(paragraph => paragraph.split(".").filter(phrase => phrase != ""))
      .map(paragraph => getFirstNPhrases(paragraph, maxPhrases))
      .map(paragraph => `${paragraph.join(".")}.`)
      .join("\n");
    return this;
  }

  logText() {
    console.log(this.text);
  }
}

const text = " Frase1. Frase2.\n Parrafo2.\n";
const myText = new Text(text);
myText
  .cutTextBeforeLastWord(20)
  .checkParagraphHasGEPhrases(0)
  .checkParagraphHasLEPhrases(2)
  .setTraillingWhiteSpacesForPhrases(10)
  .setTraillingWhiteSpacesForParagraphs(2)
  .splitPhrasesInParagraph()
  .splitParagraphWithMultipleEmptyLines(2)
  .getFirstNPhrases(1)
  .logText();
