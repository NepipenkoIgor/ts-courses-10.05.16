/**
 * можно уточнить было функцию только на примитивы
 */
function isInArray(arr:Array<any>, ...search:Array<any>): boolean {
    return search.every((item) => arr.indexOf(item) >=0 );
}

console.log(isInArray([1,2,3], 1));
console.log(isInArray([1,2,3], 1, 2));
console.log(!isInArray([1,2,3], 1, 2, 3, 4));
console.log(!isInArray([1,2,3], 4));