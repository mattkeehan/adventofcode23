const fs = require("node:fs");

console.log("hello advent of code day 3, part 2");

const shouldCheckNumber = (character, checkNumber) =>
  character.match(/[0-9]/) && !checkNumber;

const shouldEndCheck = (charIdx, line, character, checkNumber) =>
  (charIdx == line.length - 1 || !character.match(/[0-9]/)) && checkNumber;

const outsideBounds = (i, j, charIdx, lineIdx, lines) => {
  return (
    (i === 0 && j === 0) ||
    lineIdx + j < 0 ||
    lineIdx + j >= lines.length ||
    charIdx + i < 0 ||
    charIdx + i >= lines[lineIdx].length
  );
};

const findAllGears = (input) => {
  const lines = input.map((line) => line.split(""));
  const gearNumbers = {};

  lines.forEach((line, lineIdx) => {
    let currentNumber = "";
    let checkNumber = false;
    let gearLocation = null;

    line.forEach((character, charIdx) => {
      if (shouldCheckNumber(character, checkNumber)) {
        checkNumber = true;
        currentNumber = "";
        gearLocation = null;
      }

      if (shouldEndCheck(charIdx, line, character, checkNumber)) {
        if (gearLocation)
          gearNumbers[gearLocation].push(
            parseInt(
              currentNumber + (character.match(/[0-9]/) ? character : "")
            )
          );
        checkNumber = false;
      }

      if (checkNumber) {
        currentNumber += character;

        [-1, 0, 1].forEach(j => {
          [-1, 0, 1].forEach(i => {
            if (outsideBounds(i, j, charIdx, lineIdx, lines)) return;

            const charX = lines[lineIdx + j][charIdx + i];
            if (charX === "*") {
              gearLocation = `${charIdx + i},${lineIdx + j}`;
              if (!gearNumbers[gearLocation]) gearNumbers[gearLocation] = [];
            }
          });
        });
      }
    });
  });

  // add all gear numbers multiplied
  return Object.values(gearNumbers).reduce((acc, gearNum) => {
    if (gearNum.length === 2) acc += gearNum[0] * gearNum[1];
    return acc;
  }, 0);
};

try {
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  const result = findAllGears(data);
  console.log(result);
  // 73201705
} catch (err) {
  console.error(err);
}
