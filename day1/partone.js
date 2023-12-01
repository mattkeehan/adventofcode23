const fs = require('node:fs');

console.log('hello advent of code day 1');

const getFirstNum = (word) => word.split('').find(dig => !isNaN(dig));
const getLastNum = (word) => word.split('').reverse().find(dig => !isNaN(dig));

try {
  const data = fs.readFileSync('./input.txt', 'utf8').split('\n');
  data.pop();
  const res = data.reduce((accumulator, currentValue) => accumulator + Number(getFirstNum(currentValue) + getLastNum(currentValue)),0);
  console.log(res);
} catch (err) {
  console.error(err);
}