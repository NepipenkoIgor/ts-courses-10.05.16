/**
 * Created by constantant on 18.05.2016.
 */

// почему не типизировать параметры ? 
function getUnique(...array:any[]):any[] {
    let unique:any[] = [];
    array.forEach(function (item:any) {
        let isUnique:boolean = !(unique.indexOf(item) + 1);

        if (isUnique) {
            unique.push(item);
        }
    });
    return unique;
}

console.log(
    getUnique(1, 1, 1, 1, 1, 1, 1, 1),
    getUnique(1, 1, 1, 1, 1, 1, 1, 2),
    getUnique(1, 1, 1, 1, 1, 1, 0, 2)
);