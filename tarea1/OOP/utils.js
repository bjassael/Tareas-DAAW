const splitParagraphInPhrases = text => text.split(".");

const splitTextInParagraph = text => text.split("\n");

const divideText = text =>
  splitTextInParagraph(text).map(splitParagraphInPhrases);

const splitTextBy = (text, char) => text.split(char);

module.exports = {
  splitParagraphInPhrases,
  splitTextInParagraph,
  divideText,
  splitTextBy
};
