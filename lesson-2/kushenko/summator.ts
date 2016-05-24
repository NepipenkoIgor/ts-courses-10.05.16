//Написать функцию summator(), которая сумирует переданые ей аргументы.
//    Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
//

type element=string|number;

function summator(...params:element[]):number{
    let sum:number;
    sum = <number>params.reduce(function(sum:number,cur):number{
        let el = parseInt(<string>cur);
        return sum+(isNaN(el)?0:el);
    },0);
    return sum;
}

console.log (summator('1',2,10,'5'));
console.log(summator('1','www'));