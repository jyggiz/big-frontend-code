const arr = [1, [2], [3, [4]]];

// Recursive solution
function flat(arr, depth = 1) {
  return depth > 0 
    ? arr.reduce((accumulator, item) => accumulator.concat(Array.isArray(item) ? flat(item, depth - 1) : item), [])
    : arr.slice();
}

console.log(flat(arr));
// [1, 2, 3, [4]]

console.log(flat(arr, 1));
// [1, 2, 3, [4]]

console.log(flat(arr, 2));
// [1, 2, 3, 4]