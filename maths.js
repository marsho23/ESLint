// function primeNum(num) {
//   // for (let i = 0; i < num )
//   if (num === 1 || num % 2 === 0) {
//     num === false;
//   } else {
//     num === true;
//   }
// }

function prime(n) {
  if (n <= 1) {
    return false;
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 2; i < n; i++) {
    if (i % n === 0) {
      return false;
    }
  }
  return true;
}

module.exports = prime;
