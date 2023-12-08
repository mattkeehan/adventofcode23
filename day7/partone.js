const fs = require("fs");

const orderedCardValues = "AKQJT98765432";
const HIGHCARD = 0,
  ONEPAIR = 1,
  TWOPAIR = 2,
  THREEOFAKIND = 3,
  FULLHOUSE = 4,
  FOUROFAKIND = 5,
  FIVEOFAKIND = 6;

function getHandValue(hand) {
  // Set allows only unique values, so if length === 1, all cards were the same, etc
  const handSet = new Set(hand);
  
  if (handSet.size === 1) return FIVEOFAKIND;
  if (handSet.size === 2) {
    const [a, b] = [...handSet];
    if (
      hand.indexOf(a) == hand.lastIndexOf(a) ||
      hand.indexOf(b) == hand.lastIndexOf(b)
    )
      return FOUROFAKIND;
    return FULLHOUSE;
  }
  if (handSet.size === 3) {
    const [a, b, c] = [...handSet];
    let amtA = 0,
      amtB = 0,
      amtC = 0;
    [...hand].forEach((h, i) => { 
      if (h == a) amtA++;
      if (h == b) amtB++;
      if (h == c) amtC++;
    });
    if ([amtA, amtB, amtC].includes(3)) return THREEOFAKIND;
    return TWOPAIR;
  }
  if (handSet.size == 4) return ONEPAIR;
  return HIGHCARD;
}

const getResult = (input) => {
  return input
    .sort((a, b) => {
      const [hand1, bid1] = a.split(" ");
      const [hand2, bid2] = b.split(" ");
      const type1 = getHandValue(hand1);
      const type2 = getHandValue(hand2);
      
      if (type1 > type2) return -1;
      if (type1 < type2) return 1;

      for (let i = 0; i < hand1.length; i++) {
        if (
          orderedCardValues.indexOf(hand1[i]) <
          orderedCardValues.indexOf(hand2[i])
        )
          return -1;
        if (
          orderedCardValues.indexOf(hand1[i]) >
          orderedCardValues.indexOf(hand2[i])
        )
          return 1;
      }

      if (bid1 > bid2) return -1;
      if (bid1 < bid2) return 1;
      return 0;
    })
    .reduce(
      (acc, hand, i) => (acc += hand.split(" ")[1] * (input.length - i)),
      0
    );
};

try {
  console.log("hello advent of code day 6");
  const data = fs.readFileSync("./input.txt", "utf8").split("\n");
  const result = getResult(data)-1;
  console.log(result);
} catch (err) {
  console.error(err);
}
