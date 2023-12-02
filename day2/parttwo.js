const fs = require("node:fs");

console.log("hello advent of code day 2, part 2");

const formatEntry = (line, gameNumber) => {
  return {
    gameNumber,
    gameDetails: line
      .substr(line.indexOf(":") + 2, line.length)
      .split(";")
      .map((gd) =>
        gd
          .split(",")
          .map((x) => x.trim())
          .map((x) => x.split(" "))
      ),
  };
};

const getHighest = (colour, value, currentMin) =>
  value[1] === colour && Number(value[0] > currentMin)
    ? Number(value[0])
    : currentMin;

const play = (games) => {
  return games.reduce((acc, game) => {
    let minRed = 0;
    let minBlue = 0;
    let minGreen = 0;

    game.gameDetails.map((row) => {
      row.map((item) => {
        minRed = getHighest("red", item, minRed);
        minBlue = getHighest("blue", item, minBlue);
        minGreen = getHighest("green", item, minGreen);
      });
    });
    return acc + minRed * minBlue * minGreen;
  }, 0);
};

try {
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  console.log(play(data.map((d, i) => formatEntry(d, i + 1))));
} catch (err) {
  console.error(err);
}
