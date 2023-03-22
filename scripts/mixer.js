function splitAddress(fullAddress, numParts = 9) {
  const address = fullAddress.slice(2);
  const minChars = Math.floor(address.length / numParts);
  const extraChars = address.length % numParts;
  const indices = Array.from({ length: extraChars }, () =>
    Math.floor(Math.random() * numParts)
  ).sort((a, b) => a - b);

  const parts = [];
  let prevIndex = 0;
  for (let i = 0; i < indices.length; i++) {
    const index = indices[i];
    let partLen;
    if (i === 0) {
      partLen = index * minChars;
    } else {
      partLen = (index - indices[i - 1]) * minChars;
    }
    parts.push(address.slice(prevIndex, prevIndex + partLen));
    prevIndex += partLen;
    parts.push(address.slice(prevIndex, prevIndex + 1));
    prevIndex += 1;
  }
  parts.push(address.slice(prevIndex));

  return parts;
}

const fullAddress = "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db";
const parts = splitAddress(fullAddress);
console.log(parts);
