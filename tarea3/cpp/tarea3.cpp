#include <iostream>
#include <vector>
#include <map>
#include <string>

std::string ArrayToString(int *set, int setSize)
{
  std::string returnString = "array: [";
  for (int i = 0; i < setSize; i++)
  {
    returnString += std::to_string(set[i]);
    returnString += ",";
  }
  returnString += "]\n";
  return returnString;
}

int result[10000] = {0};
int factorial(int n)
{
  if (n >= 0)
  {
    result[0] = 1;
    for (int i = 1; i <= n; ++i)
    {
      result[i] = i * result[i - 1];
    }
    return result[n];
  }
}

class GeneratedTree
{
  // Access specifier
public:
  // Data Members
  // std::map<std::string, std::string> m;
  std::map<std::string, std::string> dictionary;
  int *_set;
  int *_results;
  int current_size_filled = 0;
  int _setSize;
  int _resultsSize;
  bool isValid = true;
  GeneratedTree(int *set, int setSize)
  {
    _set = set;
    _setSize = setSize;
    _resultsSize = (int)factorial(_setSize + 1) / factorial(_setSize - 1);
    _results = new int[_resultsSize];
  }

  bool pushValue(int value)
  {
    if (dictionary[std::to_string(value)] == "true")
    {
      isValid = false;
      return false;
    }
    _results[current_size_filled] = value;
    current_size_filled++;
    dictionary[std::to_string(value)] = "true";
    return true;
  }

  void printSet()
  {
    std::cout << ArrayToString(_set, _setSize);
  }
  void printResults()
  {
    std::cout << ArrayToString(_results, _resultsSize);
  }
};

GeneratedTree generateSetTree(int *set, int setSize)
{
  GeneratedTree obj1(set, setSize);
  int start = 0;
  for (int i = 0; i < obj1._setSize; i++)
  {
    for (int j = start; j < obj1._setSize; j++)
    {
      if (!obj1.pushValue(set[i] * set[j]))
      {
        return obj1;
      }

      if (!obj1.pushValue(set[i] + set[j]))
      {
        return obj1;
      };
    }
    start++;
  }
  obj1.printSet();
  obj1.printResults();
  return obj1;
}

int main()
{
  std::map<std::string, std::string> m;

  int VALUE = 3;
  int var[VALUE] = {10, 100, 200};
  GeneratedTree obj1 = generateSetTree(var, VALUE);
  std::cout << "Hello, World!\n";
  std::cout << obj1.isValid;
}