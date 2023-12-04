const fs = require("node:fs");

console.log("hello advent of code day 4");

const getResult = (lines) =>
  lines.reduce((linesAcc, line) => {
    const [resultNumbers, myNumbers] = line
      .replace(/ +/g, " ")
      .substr(line.indexOf(":"), line.length)
      .split("|");
    return (
      linesAcc +
      resultNumbers.split(" ").reduce((numbersAcc, num) => {
        return myNumbers.trim().split(" ").includes(num)
          ? numbersAcc === 0
            ? 1
            : numbersAcc * 2
          : numbersAcc;
      }, 0)
    );
  }, 0);
  
try {
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  console.log(getResult(data));
} catch (err) {
  console.error(err);
}
