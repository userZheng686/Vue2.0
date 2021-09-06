import ARRAY_METHODS from "./config";
import { observeArr } from "./observeArr";

let originArrayMethods = Array.prototype,
  arrMethods = Object.create(originArrayMethods);

ARRAY_METHODS.map((m) => {
  arrMethods[m] = function () {
    let args = Array.prototype.slice.call(arguments),
      rt = originArrayMethods[m].apply(this, args);

    let newArr;

    switch (m) {
      case "push":
      case "unshift":
        newArr = args;
        break;
      case "splice":
        newArr = args.slice(2);
        break;
      default:
        break;
    }

    newArr && observeArr(newArr);

    return rt;
  };
});

export { arrMethods };
