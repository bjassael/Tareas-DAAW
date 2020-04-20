

n = 4
startingNumber = 3;


const constructInitialSet = (number) => 
  [new Set([number]), new Set([number, number * 2, number ** 2])];

sets = [constructInitialSet(startingNumber)]

newNumber = startingNumber
let found = false
while (true) {

  newNumber = newNumber + 1;
  newNumberSum = newNumber * 2;
  newNumberProduct = newNumber * newNumber;
  for ([numbersSet, sumsProdcutsSet] of sets) {
    // This just check the new number with the existing ones
    // TODO: check the new number with the combinations with others in the set.
    if (sumsProdcutsSet.has(newNumber) && 
        !sumsProdcutsSet.has(newNumberProduct) && 
        !sumsProdcutsSet.has(newNumberSum)) {
      numbersSet.add(newNumber);
      sumsProdcutsSet.add(newNumber);
      sumsProdcutsSet.add(newNumberProduct);
      sumsProdcutsSet.add(newNumberSum);
    }

    console.log(numbersSet.size);

    if (numbersSet.size === n) { 
      found = true;
      console.log(numbersSet, sumsProdcutsSet); 
      break
    };
  }

  if (found){
    break;
  }

  sets.push(constructInitialSet(newNumber));
}
