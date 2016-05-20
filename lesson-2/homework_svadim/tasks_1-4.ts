
// 1)
// Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
//     Возвращает true, если все аргументы, кроме первого входят в первый.
//     Первым всегда должен быть массив. 

function isInArray<T> (dict:T[], ...args:T[]):boolean {
    if (dict.length === 0) {
        return (args.length === 0);
    }
    for (let arg of args) {
        if (dict.indexOf(arg) < 0) {
            return false;
        }
    }
    return true;
}

let strArray = ["course", "TypeScript", "$100", "paid"];
let numArray = [10, 0, 22, 333];

console.log("TASK #1: ");
console.log(isInArray(strArray, "course", "paid"));
console.log(isInArray(strArray, "course", "typescript"));
console.log(isInArray(strArray, "course", "paid", "test"));
console.log(isInArray(strArray, ""));
console.log("=====");
console.log(isInArray(numArray, 333, 0));
console.log(isInArray(numArray, 22, 101, 333));
console.log(isInArray(numArray, 10, 0, 22, 44));
console.log(isInArray(numArray, null));
console.log("=====");
console.log(isInArray([]));
console.log(isInArray([], ""));
console.log(isInArray([], 0));




// 2)
// писать функцию summator(), которая сумирует переданые ей аргументы.
//     Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено

function summator (...args:number[]):number;
function summator (...args:string[]):string;
function summator (...args:any[]):any {
// function summator<T> (...args:T[]):T {
    let total:number = 0;
    for (let arg of args) {
        if (typeof arg === "string" || typeof arg === "number") {
            let num = Number(arg);
            total += isNaN(num) ? 0 : num;
        }
    }
    if (typeof args[0] === "string") {
        return String(total);
    }
    return total;
}

console.log("TASK #2: ");
console.log(summator());
console.log(summator(2));
console.log(summator(2, 7));
console.log(summator(2, 7, 8));
console.log("--------------");
console.log(summator("12", "2", "7"));
console.log(summator("12", "", "7"));
console.log(summator("a12", "2", "7"));
console.log(summator("a12"));
console.log("--------------");
// console.log(summator({}));




// 3)
// Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
//     и возвращает массив уникальных элементов. Аргумент не должен изменяться.
//     Порядок элементов результирующего массива должен совпадать с порядком,
//     в котором они встречаются в оригинальной структуре.
//     Специально обрабатывать значение NaN не обязательно.
//

function getUnique<T> (...args:T[]):T[] {
    let res:T[] = [];
    for (let arg of args) {
        if ( ! isInArray(res, arg) ) {
            res.push(arg);
        }
    }
    return res;
}

console.log("TASK #3: ");
console.log(getUnique());
console.log(getUnique(2).toString());
console.log(getUnique(2, 7).toString());
console.log(getUnique(2, 7, 8, 8, 2, 5).toString());
console.log("--------------");
console.log(getUnique("12", "12", "7").toString());
console.log(getUnique("12", "", "7").toString());
console.log(getUnique("a12", "a12", "7", "7").toString());
console.log(getUnique("a12").toString());
console.log("--------------");
console.log(getUnique(true, false, false, true, true).toString());
console.log("--------------");
// TODO: не работает сравнение объектов
console.log(getUnique({a:1, b:"qq"}, {a:3, b:'QWERTY'}, {a:1, b:"qq"}));



// 4)
// Написать функцию которая будет разворачивать буквы в словах предложения, но только лишь буквы
// цифры и специальные символы должны остаться на месте
// s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
// s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
// s1tar3t 2   low5  ->  t1rat3s 2   wol5

function isLetter (symb:string) {
    let code:number = symb.charCodeAt(0);
    return ((code > 64 && code < 91) || (code > 96 && code < 123));
}

function convertWord (word:string):string {
    let delimiter:string = "";
    let srcArray:string[] = word.split(delimiter);
    let revArray:string[] = word.split(delimiter);
    let res:string = "";
    for (let s of srcArray) {
        if (isLetter(s)) {
            let ns = "";
            do {
                ns = revArray.pop();
            } while (! isLetter(ns));
            res += ns;
        } else {
            res += s;
        }
    }
    return res;
}

function convertSentense (sentence:string):string {
    let delimiter:string = " ";
    let srcArray:string[] = sentence.split(delimiter);
    for (let i=0; i<srcArray.length; i++) {
        srcArray[i] = convertWord(srcArray[i]);
    }
    return srcArray.join(delimiter);
}

console.log("TASK #4: ");
let str:string = "abc3fg_4mn7z";
console.log(`'${str}' >> '${convertSentense(str)}'`);
str = "s1tar3t 2 hellow";
console.log(`'${str}' >> '${convertSentense(str)}'`);
str = "s1ta$%r3t 2 hel^low";
console.log(`'${str}' >> '${convertSentense(str)}'`);
str = "s1tar3t 2   low5";
console.log(`'${str}' >> '${convertSentense(str)}'`);

