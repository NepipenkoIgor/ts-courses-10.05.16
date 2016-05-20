/*
 Написать функцию summator(), которая сумирует переданые ей аргументы.
 Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
 */

/**
 * 
 * isNaN and parseInt?
 */
function summator(first:string, ...list:string[]):string;
function summator(first:number, ...list:number[]):number;
function summator(first:any, ...list:any[]):any {
    return list.reduce((old:any, current:any) => old + current, first);
}

console.log(summator(1,2,3));
console.log(summator("1", "2", "3"));