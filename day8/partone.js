const fs = require("fs");

const navigate = (instruction, network, start, stepsTaken) => {
  let step;
  let res;

  for (step of instruction.split("")) {
    stepsTaken++;

    res = network[start][step];
    if (res === "ZZZ") {
      break;
    }

    start = network[start][step];
  }

  if (res !== "ZZZ") {
    return navigate(instruction, network, start, stepsTaken);
  }

  return stepsTaken;
};

const getMap = (data) => {
  return data
    .slice(2, data.length)
    .map((node) => {
      const key = node.substr(0, 3);
      const L = node.substr(7, 3);
      const R = node.substr(12, 3);

      return { [key]: { L, R } };
    })
    .reduce((result, item) => {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});
};

const getResult = (data) => {
  const instruction = data[0];
  const structuredData = getMap(data);
  const res = navigate(instruction, structuredData, "AAA", 0);
  console.log(`Completed in ${res} steps`);
};

try {
  console.log("hello advent of code day 8");
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  getResult(data);
} catch (err) {
  console.error(err);
}
