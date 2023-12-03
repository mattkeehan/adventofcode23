const fs = require("node:fs");

console.log("hello advent of code day 3");

const findNumbers = (line) => {
  const matches = [];
  const numMatch = /\d+/g;
  while ((match = numMatch.exec(line)) !== null) {
    matches.push({
      number: parseInt(match[0], 10),
      position: match.index,
    });
  }
  return matches;
};

const checkLine = (line, prevLine, nextLine) => {
  const symbolMatch = /[^0-9.]+/g;
  const numberMatches = findNumbers(line);

  const totalForLine = numberMatches.reduce((acc, num) => {
    [line, prevLine, nextLine].forEach((l) => {
      if (!l) return acc;

      lineToCurrentNum = l.substr(
        num.position === 0 ? num.position : num.position - 1,
        num.position === 0
          ? String(num.number).length + 1
          : String(num.number).length + 2
      );
      
      if (lineToCurrentNum.match(symbolMatch)) acc = acc + num.number;
    });

    return acc;
  }, 0);

  return totalForLine;
};

try {
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  const result = data.reduce((acc, line, idx) => {
    return acc + checkLine(line, data[idx - 1], data[idx + 1]);
  }, 0);
  console.log(result);
} catch (err) {
  console.error(err);
}
