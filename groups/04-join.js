const total = items
  .map(price)
  .reduce(sum, 0);
console.log(total);
