function generateSetTree(_set) {
  let listMultipliedOrAdded = [];
  let start = 0;
  for (let number of _set) {
    for (let j = start; j < _set.length; j++) {
      if (listMultipliedOrAdded.includes(number * _set[j])) {
        return false;
      }
      listMultipliedOrAdded.push(number * _set[j]);
      if (listMultipliedOrAdded.includes(number + _set[j])) {
        return false;
      }
      listMultipliedOrAdded.push(number + _set[j]);
    }
    start += 1;
  }
  return listMultipliedOrAdded;
}

function isNumberValidOnSets(numberToAdd, setToAdd) {
  if (setToAdd.length === 0) {
    return true;
  }
  if (setsGenerated[`[${setToAdd.join(", ")}]`] === undefined) {
    setsGenerated[`[${setToAdd.join(", ")}]`] = generateSetTree(setToAdd);
  }
  const newSet = [...setToAdd, numberToAdd];
  setsGenerated[`[${newSet.join(", ")}]`] = false;
  if (!setsGenerated[`[${setToAdd.join(", ")}]`]) {
    return false;
  }
  const newList = [...setsGenerated[`[${setToAdd.join(", ")}]`]];
  for (const number of newSet) {
    if (newList.includes(number + numberToAdd)) {
      return false;
    }
    newList.push(number + numberToAdd);
    if (newList.includes(number * numberToAdd)) {
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

var setsGenerated;
var MAX_LEN;
var MAX_NUMBER_FROM_SET;
var finalArray;

const calculateSet = () => {
  MAX_LEN = Number(document.getElementById("number").value);
  MAX_NUMBER_FROM_SET = Infinity;
  setsGenerated = {};
  finalArray = [];

  try {
    if (MAX_LEN > 47 || MAX_LEN <= 2) {
      throw Error;
    } else {
      document.getElementById("error").innerText = "";
    }
  } catch (Error) {
    document.getElementById("error").innerText =
      "Por favor ingrese un número entre 3 y 47 (ambos incluidos).";
    return;
  }

  const start = new Date().getTime();
  RecursiveFunction();
  const end = new Date().getTime();
  console.log("finalArray", finalArray);

  const time = end - start;
  console.log("time", time);

  let text = "{";
  finalArray.forEach((x) => {
    text += x + ", ";
  });
  text = text.substring(0, text.length - 2);
  text += "}";
  document.getElementById("duration").innerText = `${time / 1000} segundos`;
  document.getElementById("result").innerText = `${text}`;
};

calculateSet();
