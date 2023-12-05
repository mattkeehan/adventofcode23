const fs = require("fs");

const getSeedList = (data) =>
  data[0]
    .replace("seeds: ", "")
    .split(" ")
    .map((n) => Number(n));

const getIndexes = (data) => [
  data.indexOf("seed-to-soil map:") - 1,
  data.indexOf("soil-to-fertilizer map:") - 1,
  data.indexOf("fertilizer-to-water map:") - 1,
  data.indexOf("water-to-light map:") - 1,
  data.indexOf("light-to-temperature map:") - 1,
  data.indexOf("temperature-to-humidity map:") - 1,
  data.indexOf("humidity-to-location map:") - 1
];

const getMinLocation = (data) => {
  const indexes = [...getIndexes(data), data.length];
  const maps = indexes.slice(0, -1).map((dataMap, idx) => {
    const lines = data.slice(dataMap + 1, indexes[idx + 1]);
    return lines.map((line) => line.split(" ").map(Number));
  });

  return Math.min(
    ...getSeedList(data).map((seed) => {
      maps.forEach((item) => {
        for ([end, start, length] of item) {
          if (seed >= start && seed <= start + length - 1) {
            seed = end + (seed - start);
            break;
          }
        }
      });

      return seed;
    })
  );
};

try {
  console.log("hello advent of code day 3");
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  const result = getMinLocation(data);
  console.log(result);
} catch (err) {
  console.error(err);
}
