const fs = require("node:fs");

console.log("hello advent of code day 2");

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

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
    )
  };
};

const play = games => {
  return games.reduce((accumulator, game) => {
    let successfulGame = true;
    game.gameDetails.forEach(gd => gd.map(line => {
      if (maxCubes[line[1]] < line[0]) successfulGame = false;
    }));

    return successfulGame ? 
      accumulator + game.gameNumber :
      accumulator
  }, 0);
};

try {
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  const structuredData = data.map((d, i) => formatEntry(d, i+1));
  console.log(play(structuredData));
  
} catch (err) {
  console.error(err);
}
