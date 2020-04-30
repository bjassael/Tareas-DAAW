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

function isSetValid(_set) {
  const dictMultipliedOrAdded = {};
  let start = 0;
  for (let number of _set) {
    for (let j = start; j < _set.length; j++) {
      if (dictMultipliedOrAdded[number * _set[j]]) {
        return false;
      }
      dictMultipliedOrAdded[number * _set[j]] = true;
      if (dictMultipliedOrAdded[number + _set[j]]) {
        return false;
      }
      dictMultipliedOrAdded[number + _set[j]] = true;
    }
    start += 1;
  }
  return true;
}

function isNumberValidOnSets(numberToAdd, setToAdd) {
  if (setsGenerated[`[${setToAdd.join(", ")}]`] === undefined) {
    setsGenerated[`[${setToAdd.join(", ")}]`] = generateSetTree(setToAdd);
  }
  const newSet = [...setToAdd, numberToAdd];
  const newList = [...setsGenerated[`[${setToAdd.join(", ")}]`]];
  for (let number of newSet) {
    if (
      setsGenerated[`[${setToAdd.join(", ")}]`].includes(number * numberToAdd)
    ) {
      setsGenerated[`[${newSet.join(", ")}]`] = false;
      return false;
    }
    newList.push(number * numberToAdd);
    if (
      setsGenerated[`[${setToAdd.join(", ")}]`].includes(number + numberToAdd)
    ) {
      setsGenerated[`[${newSet.join(", ")}]`] = false;
      return false;
    }
    newList.push(number + numberToAdd);
  }
  setsGenerated[`[${newSet.join(", ")}]`] = newList;
  return true;
}

function checkIfNumberToPushIsValid(number) {
  if (answer[`[${number}]`]) {
    return true;
  }
  answer[`[${number}]`] = isSetValid([number]);
  return answer[`[${number}]`];
}

function checkIfListWithNumberToPushIsValid(listToCheck, numberToStart) {
  if (answer[`[${listToCheck.join(", ")}]`]) {
    return true;
  }
  answer[`[${listToCheck.join(", ")}]`] = isNumberValidOnSets(
    numberToStart,
    listToCheck
  );
  passedListsWithLenGreaterThanOne[`[${listToCheck.join(", ")}]`] = true;
  return answer[`[${listToCheck.join(", ")}]`];
}

function findListFromStartingNumber(numberToStart) {
  const listOfNumbers = [];
  while (
    listOfNumbers.length < MAX_LEN &&
    numberToStart <= MAX_NUMBER_FROM_SET
  ) {
    if (
      passedListsWithLenGreaterThanOne[
        `[${[...listOfNumbers, numberToStart].join(", ")}]`
      ] === undefined &&
      checkIfNumberToPushIsValid(numberToStart)
    ) {
      if (
        checkIfListWithNumberToPushIsValid([...listOfNumbers], numberToStart)
      ) {
        listOfNumbers.push(numberToStart);
      }
    }
    numberToStart++;
  }
  return listOfNumbers;
}

function returnBetterAnswer(array1, array2) {
  if (array1.length < MAX_LEN) return array2;
  if (array2.length < MAX_LEN) return array1;
  if (array1[array1.length - 1] < array2[array2.length - 1]) return array1;
  return array2;
}

function RecursiveFunction(numberToPush = 1) {
  const response = findListFromStartingNumber(numberToPush);
  if (response.length < MAX_LEN) {
    if (numberToPush + 1 > MAX_NUMBER_FROM_SET) {
      return;
    }
    return RecursiveFunction(numberToPush + 1);
  }
  MAX_NUMBER_FROM_SET = response[response.length - 1];
  finalArray = returnBetterAnswer(response, finalArray);
  return RecursiveFunction(numberToPush);
}

var answer = {};
var setsGenerated = {};
var passedListsWithLenGreaterThanOne = {};
var MAX_LEN = 40;
var MAX_NUMBER_FROM_SET = Infinity;
var finalArray = [];
const start = new Date().getTime();
RecursiveFunction();
console.log("finalArray", finalArray);

const end = new Date().getTime();
const time = end - start;
console.log("time", time);
