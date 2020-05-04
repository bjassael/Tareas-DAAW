#include <iostream>
#include <algorithm>
#include <vector>
#include <map>
#include <string>
#include <limits>
#include <chrono>

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

std::string HashArrayToString(std::vector<int> set)
{
  return std::string(set.begin(), set.end());
}

class MaybeGeneratedTree
{
  // Access specifier
public:
  // Data Members
  std::vector<int> _results; // [1, 2, 0 ,0, 0, 0] || [1, 2, 3, 4, 6, 9]
  bool isValid = true;

  bool pushValue(int value)
  {
    if (std::find(_results.begin(), _results.end(), value) != _results.end())
    {
      isValid = false;
      return false;
    }
    _results.push_back(value);
    return true;
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
  std::string hash = HashArrayToString(set);
  if (setsGenerated.count(hash) == 0)
  {
    setsGenerated.emplace(hash, generateSetTree(set, true));
  }

  std::vector<int> newSet(set.begin(), set.end());
  newSet.push_back(numberToAdd);

  MaybeGeneratedTree generatedTree = generateSetTree(newSet, setsGenerated[hash].isValid);
  setsGenerated.emplace(HashArrayToString(newSet), generatedTree);

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
  while (
      listOfNumbers.size() < MAX_LEN &&
      numberToStart <= MAX_NUMBER_FROM_SET)
  {
    std::vector<int> newCombination(listOfNumbers.begin(), listOfNumbers.end());
    newCombination.push_back(numberToStart);
    if ((setsGenerated.count(HashArrayToString(newCombination)) == 0 || listOfNumbers.size() == 0) &&
        numberToStart != 2)
    {
      if (IsValidNumberOnSetToAdd(numberToStart, listOfNumbers, setsGenerated))
      {
        listOfNumbers.push_back(numberToStart);
      }
    }
    numberToStart++;
  }
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

int main(int argc, char *argv[])
{
  std::map<std::string, std::string> m;
  std::map<std::string, MaybeGeneratedTree> setsGenerated;

  std::vector<int> finalArray;
  // int MAX_LEN = 6;
  int MAX_NUMBER_FROM_SET = std::numeric_limits<int>::max();

  if (argc > 1)
  {
    int MAX_LEN = std::atoi(argv[1]);
    if (MAX_LEN >= 3 && MAX_LEN <= 47)
    {
      std::cout << "n = " << MAX_LEN << "\n";
      clock_t time = clock();
      RecursiveFunction(1, MAX_LEN, MAX_NUMBER_FROM_SET, setsGenerated, finalArray);
      time = clock() - time;
      double duration = double(time) / CLOCKS_PER_SEC;

      std::cout << duration << " segundos"
                << "\n";
      std::cout << "finalArray: " << ArrayToString(finalArray) << "\n";
    }
    else
    {
      std::cout << "número inválido, 3 <= n <= 47"
                << "\n";
    }
  }
  return 0;
}