const fs = require("fs");

const getTimes = (data) =>
  data.map((d) =>
    d.includes("Time:")
      ? d
          .substr("Time:".length, d.length)
          .replace(/ /g,'')
          .split(" ")
          .filter((subArray) => subArray.length > 0)
      : d
          .substr("Distance:".length, d.length)
          .replace(/ /g,'')
          .split(" ")
          .filter((subArray) => subArray.length > 0)
  );

const findNumberPairs = (arr) => {
  return arr.map((target) => {
    const pairs = [];
    for (let i = 0; i <= target; i++) pairs.push(i * (target - i));
    return pairs;
  });
};

const getResult = (data) => {
  const [times, distances] = getTimes(data);
  const nmbrp = findNumberPairs(times);

  return distances.map((d, idx) => {
    let count = 0;
    nmbrp[idx].forEach((n) => {
      if (n > d) count++;
    });
    return count;
  }).reduce((acc, b) => b * acc);
};

try {
  console.log("hello advent of code day 6");
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  const result = getResult(data);
  console.log(result);
} catch (err) {
  console.error(err);
}
