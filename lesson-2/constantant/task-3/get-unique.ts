/**
 * Created by constantant on 18.05.2016.
 */

// почему не типизировать параметры ? 
function getUnique<T>(...array: T[]): T[] {
    let unique: T[] = [];
    // arrow function ()=>{}
    array.forEach(function (item: T) {
        let isUnique: boolean = !(unique.indexOf(item) + 1);

        if (isUnique) {
            unique.push(item);
        }
    });
    return unique;
}

console.log(
    getUnique<number>(1, 1, 1, 1, 1, 1, 1, 1),
    getUnique<string>('1', '1', '1', '1', '1', '1', '1', '2'),
    getUnique<number|string>(1, '1', 1, '1', 1, 1, 0, '2')
);