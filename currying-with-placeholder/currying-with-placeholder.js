const  join = (a, b, c) => {
  return `${a}_${b}_${c}`
}

function curry(fn) {
  function  _curry(args) {
    return function () {
      const length = args.length;
      const newArgs = arguments;
      const { length: newArgsLength } = newArgs;
      let remaining = fn.length;
      const combined = [];
      let newArgsIndex = 0;
      let value;

      if (length) {
        let index = -1;

        while(++index < length) {
          combined[index] = value = args[index] === _ && newArgsIndex < newArgsLength
            ? newArgs[newArgsIndex++]
            : args[index];

          if (value !== _) {
            --remaining;
          }
        }
      }

      if (newArgsIndex < newArgsLength) {
        while (newArgsIndex < newArgsLength) {
          combined[combined.length] = value = newArgs[newArgsIndex];

          if (value !== _ && newArgsIndex < fn.length) {
            --remaining;
          }

          newArgsIndex++;
        }
      }

      return remaining > 0 ? _curry(combined) : fn.apply(this, combined);
    }
  }

  return _curry([]);
}

curry.placeholder = Symbol('curry');

const curriedJoin = curry(join)
const _ = curry.placeholder

console.log(curriedJoin(1, 2, 3)) // '1_2_3'

console.log(curriedJoin(_, 2)(1, 3)) // '1_2_3'

console.log(curriedJoin(_, _, _)(1)(_, 3)(2)) // '1_2_3'