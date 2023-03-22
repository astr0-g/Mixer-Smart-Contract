function splitAddress(fullAddress, numParts = 9) {
  const addr = fullAddress.slice(2); // Remove the "0x" prefix

  const x = addr.slice(0, 1);
  const r = addr.slice(1, 5);
  const w = addr.slice(5, 9);
  const z = addr.slice(9, 13);
  const s = addr.slice(13, 17);
  const v = addr.slice(17, 21);
  const y = addr.slice(21, 25);
  const u = addr.slice(25, 29);
  const t = addr.slice(29); // Adjust this line to

  return { r, s, t, u, v, w, x, y, z };
}
