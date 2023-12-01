const fs = require("node:fs");

console.log("hello advent of code day 1, part 2");

const replaceSubstringsWithNumbers = (word) => {
  const replacements = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  word = word
      .replace(/oneight/g, "oneeight")
      .replace(/threeight/g, "threeeight")
      .replace(/fiveight/g, "fiveeight")
      .replace(/nineight/g, "nineeight")
      .replace(/twone/g, "twoone")
      .replace(/sevenine/g, "sevennine")
      .replace(/eightwo/g, "eighttwo");

  replacements.forEach((r) => {
    while (word.includes(r)) {
      word = word.replace(r, replacements.lastIndexOf(r) + 1);
    }
  });
  return word;
};

const getFirstNum = (word) => word.split("").find((dig) => !isNaN(dig));
const getLastNum = (word) =>
  word
    .split("")
    .reverse()
    .find((dig) => !isNaN(dig));

try {
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  data.pop();

  const res = data.reduce(
    (accumulator, currentValue) =>
      accumulator +
      Number(
        getFirstNum(replaceSubstringsWithNumbers(currentValue)) +
          getLastNum(replaceSubstringsWithNumbers(currentValue))
      ),
    0
  );
  console.log(res);
  // 54719 correct
} catch (err) {
  console.error(err);
}
