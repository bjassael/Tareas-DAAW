#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <limits>

std::string ArrayToString(std::vector<int> set)
{
  std::string returnString = "[";
  for (int number : set)
  {
    returnString += std::to_string(number);
    returnString += ",";
  }
  returnString += "]";
  return returnString;
}

class MaybeGeneratedTree
{
  // Access specifier
public:
  // Data Members
  std::map<int, bool> dictionary;
  std::vector<int> _set;     // [1, 2]  || [1, 3]
  std::vector<int> _results; // [1, 2, 0 ,0, 0, 0] || [1, 2, 3, 4, 6, 9]
  bool isValid = true;

  bool pushValue(int value)
  {
    if (dictionary[value])
    {
      isValid = false;
      return false;
    }
    _results.push_back(value);
    dictionary[value] = true;
    return true;
  }

  void printSet()
  {
    std::cout << "array: " << ArrayToString(_set) << "\n";
  }
  void printResults()
  {
    std::cout << "array: " << ArrayToString(_results) << "\n";
  }
};

MaybeGeneratedTree generateSetTree(std::vector<int> set, bool parentIsValid)
{
  MaybeGeneratedTree maybeResultSet;

  if (!parentIsValid)
  {
    maybeResultSet.isValid = false;
    return maybeResultSet;
  }

  maybeResultSet._set = set;

  int start = 0;
  for (int number : set)
  {
    for (int j = start; j < set.size(); j++)
    {
      if (!maybeResultSet.pushValue(number * set[j]))
      {
        return maybeResultSet;
      }

      if (!maybeResultSet.pushValue(number + set[j]))
      {
        return maybeResultSet;
      };
    }
    start++;
  }
  return maybeResultSet;
}

bool IsValidNumberOnSetToAdd(
    int numberToAdd,      //12
    std::vector<int> set, // [1,3,7]
    std::map<std::string, MaybeGeneratedTree> &setsGenerated)
{
  if (set.size() == 0)
  {
    return true;
  }
  if (setsGenerated.count(ArrayToString(set)) == 0)
  {
    setsGenerated.emplace(ArrayToString(set), generateSetTree(set, true));
  }

  std::vector<int> newSet(set.begin(), set.end());
  newSet.push_back(numberToAdd);

  std::vector<int> newResults(
      setsGenerated[ArrayToString(set)]._results.begin(),
      setsGenerated[ArrayToString(set)]._results.end());

  MaybeGeneratedTree generatedTree = generateSetTree(newSet, setsGenerated[ArrayToString(set)].isValid);
  setsGenerated.emplace(ArrayToString(newSet), generatedTree);

  if (!generatedTree.isValid)
  {
    return false;
  }
  return true;
}

std::vector<int> FindListFromStartingNumber(
    int numberToStart,
    int MAX_LEN,
    int MAX_NUMBER_FROM_SET,
    std::map<std::string, MaybeGeneratedTree> &setsGenerated)
{
  std::vector<int> listOfNumbers;
  std::cout << "numberToStart: " << numberToStart << "\n";
  while (
      listOfNumbers.size() < MAX_LEN &&
      numberToStart <= MAX_NUMBER_FROM_SET)
  {
    std::vector<int> newCombination(listOfNumbers.begin(), listOfNumbers.end());
    newCombination.push_back(numberToStart);
    std::cout << "newCombination: " << ArrayToString(newCombination) << "\n";
    if ((setsGenerated.count(ArrayToString(newCombination)) == 0 || listOfNumbers.size() == 0) &&
        numberToStart != 2)
    {
      if (IsValidNumberOnSetToAdd(numberToStart, listOfNumbers, setsGenerated))
      {
        listOfNumbers.push_back(numberToStart);
      }
    }
    numberToStart++;
  }
  std::cout << "listOfNumbers.size(): " << listOfNumbers.size() << "\n";
  return listOfNumbers;
}

void RecursiveFunction(
    int numberToPush,
    int MAX_LEN,
    int &MAX_NUMBER_FROM_SET,
    std::map<std::string, MaybeGeneratedTree> &setsGenerated,
    std::vector<int> &finalArray)
{
  std::vector<int> response = FindListFromStartingNumber(numberToPush, MAX_LEN, MAX_NUMBER_FROM_SET, setsGenerated);
  std::cout << "response: " << ArrayToString(response) << "\n";
  std::cout << "MAX_NUMBER_FROM_SET: " << MAX_NUMBER_FROM_SET << "\n";
  std::cout << "numberToPush: " << numberToPush << "\n";
  if (response.size() < MAX_LEN)
  {
    if (numberToPush + MAX_LEN > MAX_NUMBER_FROM_SET)
    {
      return;
    }
    return RecursiveFunction(numberToPush + 1, MAX_LEN, MAX_NUMBER_FROM_SET, setsGenerated, finalArray);
  }
  MAX_NUMBER_FROM_SET = response.back();
  finalArray = response;
  return RecursiveFunction(numberToPush, MAX_LEN, MAX_NUMBER_FROM_SET, setsGenerated, finalArray);
}

int main()
{
  std::map<std::string, std::string> m;
  std::map<std::string, MaybeGeneratedTree> setsGenerated;

  std::vector<int> finalArray;
  int MAX_LEN = 6;
  int MAX_NUMBER_FROM_SET = std::numeric_limits<int>::max();
  RecursiveFunction(1, MAX_LEN, MAX_NUMBER_FROM_SET, setsGenerated, finalArray);
  std::cout << "finalArray: " << ArrayToString(finalArray);
}