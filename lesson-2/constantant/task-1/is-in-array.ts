/**
 * Created by constantant on 18.05.2016.
 */

function isInArray<T>(array: T[], ...targets: T[]): boolean {

    if (!Array.isArray(array)) {
        throw new TypeError('First argument must be like an Array! ');
    }

    if (targets.length === 0) {
        throw new Error('No target!');
    }

    // работа в массиве с массивом не есть хорошо и почему не ()=>{}
    /* return targets.every(function (target:any) {
        return array.some(function (item:any) {
            return item === target;
        });
    }); */

    return targets.every(( target: T ) => {
        return array.indexOf(target) !== -1;
    });
}


type test1 = number | {a: number};
type test2 = number | number[];
type test34 = test2 | string;

let arr: any[] = [],
    num1: number = 1,
    num2: string = '2',
    obj1: {a: number} = {a: 1},
    obj2: number[] = [1, 2, 3];

arr.push(num1, num2, obj1, obj2);

console.log(
    isInArray<test1>(arr, num1, obj1),
    isInArray<test2>(arr, 33, obj2),
    isInArray<test34>(arr, obj2, num2, num1),
    isInArray<test34>(arr, obj2, '1212', num1)
    // isInArray(arr)
    // isInArray(123, obj2, '1212', num1)
);