const fs = require('fs');

// 6227972

const file = fs.readFileSync(fileName, 'utf8').split("\n");


const part2 = ( input ) => {
  let result = 0;
  let cards = Array(input.length).fill(1);

  for (let i = 0; i < input.length; i++) {
      const { have, winning } = getNumbers({ row: input[i] });
      const matches = winning.filter((n) => have.includes(n));

      if (matches.length > 0) {
          for (let j = 1; j <= matches.length; j++) {
              if (cards[i + j]) cards[i + j] += cards[i];
          }
      }
  }
  result = cards.reduce((a, b) => a + b, 0);

  return result;
};

const getNumbers = ({ row }) => {
  const matches = row.match(/: (.+?) \| (.+)/);
  const winning = matches[1].match(/\d+/g);
  const have = matches[2].match(/\d+/g);
  return { winning, have };
};

// console.log(`Part 2: ${cards.length} cards`);
console.log(part2(file))