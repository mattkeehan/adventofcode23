const fs = require("fs");

const allSame = (nums) => nums.every((n) => n === nums[0]);

const findDifferences = (lineAsArr) => {
  const diffs = [];

  for (let i = 0; i < lineAsArr.length - 1; i++) {
    diffs.push(lineAsArr[i + 1] - lineAsArr[i]);
  }
  return diffs;
};

const nextDiffValue = (lineAsArr) => {
  if (allSame(lineAsArr)) return lineAsArr[0];

  // lineAsArr = lineAsArr.reverse();
  console.log(lineAsArr);
  const diffs = findDifferences(lineAsArr);
  const nextDiff = nextDiffValue(diffs);
  return lineAsArr[lineAsArr.length - 1] + nextDiff;
};

const getResult = (lines) => {
  const linesAsArr = lines.map((line) => line.split(" ").map((n) => Number(n)).reverse());
  const lineTotals = linesAsArr.map(nextDiffValue);
  return lineTotals.reduce((total, num) => total + num, 0);
};

try {
  console.log("hello advent of code day 9 part 2");
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  console.log(getResult(data));
} catch (err) {
  console.error(err);
}
