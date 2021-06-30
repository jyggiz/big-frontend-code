const join = (a, b, c) => {
  return `${a}_${b}_${c}`
}

function curry(callback) {
  return function curried(...args) {
    if (args.length >= callback.length) {
      return callback.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

const curriedJoin = curry(join)

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'