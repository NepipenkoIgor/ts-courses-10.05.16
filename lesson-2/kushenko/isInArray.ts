/*
 Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
 Возвращает true, если все аргументы, кроме первого входят в первый.
 Первым всегда должен быть массив.
 */
type elem=number|string|boolean;
function isInArray (arr:elem[], ...elem:elem[]):boolean {
    for (let el of elem) {
        if (arr.indexOf(el) === -1) {
            return false;
        }
    }
    return true;
}


console.log (isInArray([1,2,3,'cat',true],true,'cat',3));
console.log (isInArray([1,2,3,'cat',true],true,'cat',5));
console.log (isInArray([1,2,3,'cat',true],false,'cat',3));
console.log (isInArray([1,2,3,'cat',true]));