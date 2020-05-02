n = 4;
startingNumber = 1;
resultSize = { 1: 2, 2: 6, 3: 12, 4: 20, 5: 30, 11: 132, 23: 552, 47: 2256 };

const constructInitialSet = (number) => [
  new Set([number]),
  new Set([number * 2, number ** 2]),
];
sets = [constructInitialSet(startingNumber)];

newNumber = startingNumber;
let found = false;
while (true) {
  newNumber = newNumber + 1;
  if (newNumber === 2) newNumber++;
  newNumberSum = newNumber * 2;
  newNumberProduct = newNumber ** 2;
  for ([numbersSet, sumsProdcutsSet] of sets) {
    // This just check the new number with the existing ones
    // TODO: check the new number with the combinations with others in the set.
    if (
      // sumsProdcutsSet.has(newNumber) &&
      !sumsProdcutsSet.has(newNumberProduct) &&
      !sumsProdcutsSet.has(newNumberSum) &&
      newNumberSum !== newNumberProduct
    ) {
      let checkCombinations = true;
      let newCombinations = new Set([]);
      for (let number of numbersSet) {
        if (
          sumsProdcutsSet.has(number + newNumber) ||
          sumsProdcutsSet.has(number * newNumber) ||
          newCombinations.has(number + newNumber) ||
          newCombinations.has(number * newNumber) ||
          number + newNumber === number * newNumber
        ) {
          checkCombinations = false;
          break;
        } else {
          newCombinations.add(number + newNumber);
          newCombinations.add(number * newNumber);
        }
      }
      if (checkCombinations) {
        numbersSet.add(newNumber);
        // sumsProdcutsSet.add(newNumber);
        sumsProdcutsSet.add(newNumberProduct);
        sumsProdcutsSet.add(newNumberSum);
        newCombinations.forEach((combination) =>
          sumsProdcutsSet.add(combination)
        );
      }
    }

    console.log(numbersSet, sumsProdcutsSet, sumsProdcutsSet.size);

    if (numbersSet.size === n && sumsProdcutsSet.size === resultSize[n]) {
      found = true;
      console.log("===================================");
      console.log(numbersSet, sumsProdcutsSet, sumsProdcutsSet.size);
      break;
    }
  }

  if (found) {
    break;
  }

  sets.push(constructInitialSet(newNumber));
}
