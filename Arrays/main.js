    // Start array (minimaal 5 items, 3+ datatypes)
let arr = [10, "appel", true, 5.5, { naam: "Pikachu" }];
console.log("Start:", arr);

// length
console.log("length:", arr.length);
console.log(arr);

// toString()
let r_toString = arr.toString();
console.log("toString:", r_toString);
console.log(arr);

// at()
let r_at = arr.at(1);
console.log("at(1):", r_at);
console.log(arr);

// join()
let r_join = arr.join(" | ");
console.log("join:", r_join);
console.log(arr);

// pop()
let r_pop = arr.pop();
console.log("pop:", r_pop);
console.log(arr);

// push()
let r_push = arr.push("nieuw");
console.log("push:", r_push);
console.log(arr);

// shift()
let r_shift = arr.shift();
console.log("shift:", r_shift);
console.log(arr);

// unshift()
let r_unshift = arr.unshift(99);
console.log("unshift:", r_unshift);
console.log(arr);

// delete
delete arr[1];
console.log("delete index 1");
console.log(arr);

// concat()
let extra = ["extra", false];
let r_concat = arr.concat(extra);
console.log("concat:", r_concat);
console.log(arr);

// copyWithin()
let r_copyWithin = arr.copyWithin(0, 1);
console.log("copyWithin:", r_copyWithin);
console.log(arr);

// flat()
let nested = [1, [2, [3, 4]]];
let r_flat = nested.flat(2);
console.log("flat:", r_flat);

// splice()
let r_splice = arr.splice(1, 1, "vervangen");
console.log("splice removed:", r_splice);
console.log(arr);

// toSpliced()
let r_toSpliced = arr.toSpliced(1, 1, "nieuwItem");
console.log("toSpliced:", r_toSpliced);
console.log(arr);

// slice()
let r_slice = arr.slice(1, 3);
console.log("slice:", r_slice);
console.log(arr);

// indexOf()
let r_indexOf = arr.indexOf("nieuw");
console.log("indexOf:", r_indexOf);
console.log(arr);

// lastIndexOf()
let r_lastIndexOf = arr.lastIndexOf("nieuw");
console.log("lastIndexOf:", r_lastIndexOf);
console.log(arr);

// includes()
let r_includes = arr.includes(true);
console.log("includes true:", r_includes);
console.log(arr);

// sort()
let sortArray = [3, 1, 5, 2];
sortArray.sort();
console.log("sort:", sortArray);

// reverse()
sortArray.reverse();
console.log("reverse:", sortArray);
