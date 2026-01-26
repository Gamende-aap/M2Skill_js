// array met verschillende dingen
let arr = [10, "appel", true, 5.5, { naam: "Pikachu" }];
console.log(arr);

// length
console.log(arr.length);

// toString
console.log(arr.toString());

// at
console.log(arr.at(1));

// join
console.log(arr.join(" | "));

// pop
arr.pop();
console.log(arr);

// push
arr.push("nieuw");
console.log(arr);

// shift
arr.shift();
console.log(arr);

// unshift
arr.unshift(99);
console.log(arr);

// delete
delete arr[1];
console.log(arr);

// concat
let extra = ["extra", false];
console.log(arr.concat(extra));

// copyWithin
arr.copyWithin(0, 1);
console.log(arr);

// flat
let nested = [1, [2, [3, 4]]];
console.log(nested.flat(2));

// splice
arr.splice(1, 1, "vervangen");
console.log(arr);

// toSpliced
let nieuw = arr.toSpliced(1, 1, "nieuwItem");
console.log(nieuw);

// slice
console.log(arr.slice(1, 3));

// indexOf
console.log(arr.indexOf("nieuw"));

// lastIndexOf
console.log(arr.lastIndexOf("nieuw"));

// includes
console.log(arr.includes(true));

// sort
let nums = [3, 1, 5, 2];
nums.sort();
console.log(nums);

// reverse
nums.reverse();
console.log(nums);
