function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function splitAddress(address, numParts = 6) {
  const addressNoPrefix = address.slice(2); // Remove the '0x' prefix
  const totalLength = addressNoPrefix.length;

  const splitPoints = Array.from({ length: numParts - 1 }, () =>
    getRandomInt(1, totalLength - 1)
  ).sort((a, b) => a - b);
  splitPoints.unshift(0);
  splitPoints.push(totalLength);

  const substrings = [];
  for (let i = 0; i < numParts; i++) {
    substrings.push(addressNoPrefix.slice(splitPoints[i], splitPoints[i + 1]));
  }

  return substrings;
}

const address = "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db";
const substrings = splitAddress(address);
console.log(substrings);
