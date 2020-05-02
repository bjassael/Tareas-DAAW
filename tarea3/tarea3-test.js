function generateSetTree(_set) {
  let listMultipliedOrAdded = [];
  let start = 0;
  for (let number of _set) {
    for (let j = start; j < _set.length; j++) {
      if (listMultipliedOrAdded[number * _set[j]]) {
        return false;
      }
      listMultipliedOrAdded.push(number * _set[j]);
      if (listMultipliedOrAdded[number + _set[j]]) {
        return false;
      }
      listMultipliedOrAdded.push(number + _set[j]);
    }
    start += 1;
  }
  return listMultipliedOrAdded;
}

function isNumberValidOnSets(numberToAdd, setToAdd) {
  if (setToAdd.length === 1) {
    return true;
  }
  if (setsGenerated[`[${setToAdd.join(", ")}]`] === undefined) {
    setsGenerated[`[${setToAdd.join(", ")}]`] = generateSetTree(setToAdd);
  }
  const newSet = [...setToAdd, numberToAdd];
  const newList = [...setsGenerated[`[${setToAdd.join(", ")}]`]];
  for (let number of newSet) {
    if (
      setsGenerated[`[${setToAdd.join(", ")}]`].includes(number + numberToAdd)
    ) {
      setsGenerated[`[${newSet.join(", ")}]`] = false;
      return false;
    }
    newList.push(number + numberToAdd);
    if (
      setsGenerated[`[${setToAdd.join(", ")}]`].includes(number * numberToAdd)
    ) {
      setsGenerated[`[${newSet.join(", ")}]`] = false;
      return false;
    }
    newList.push(number * numberToAdd);
  }
  setsGenerated[`[${newSet.join(", ")}]`] = newList;
  return true;
}

function findListFromStartingNumber(numberToStart) {
  const listOfNumbers = [];
  while (
    listOfNumbers.length < MAX_LEN &&
    numberToStart <= MAX_NUMBER_FROM_SET
  ) {
    if (
      (setsGenerated[`[${[...listOfNumbers, numberToStart].join(", ")}]`] ===
        undefined ||
        listOfNumbers.length === 0) &&
      numberToStart !== 2
    ) {
      if (isNumberValidOnSets(numberToStart, [...listOfNumbers])) {
        listOfNumbers.push(numberToStart);
      }
    }
    numberToStart++;
  }
  return listOfNumbers;
}

function RecursiveFunction(numberToPush = 1) {
  const response = findListFromStartingNumber(numberToPush);
  if (response.length < MAX_LEN) {
    if (numberToPush + MAX_LEN > MAX_NUMBER_FROM_SET) {
      return;
    }
    return RecursiveFunction(numberToPush + 1);
  }
  MAX_NUMBER_FROM_SET = response[response.length - 1];
  finalArray = response;
  return RecursiveFunction(numberToPush);
}

var setsGenerated = {};
var MAX_LEN = 47;
var MAX_NUMBER_FROM_SET = Infinity;
var finalArray = [];
const start = new Date().getTime();
if (MAX_LEN < 2) {
  console.log("no hay solución");
} else if (MAX_LEN == 2) {
  finalArray = [1];
  findListFromStartingNumber(1);
} else {
  RecursiveFunction();
}
const end = new Date().getTime();
console.log("finalArray", finalArray);
const time = end - start;
console.log("time", time);
// console.log("object", setsGenerated);
