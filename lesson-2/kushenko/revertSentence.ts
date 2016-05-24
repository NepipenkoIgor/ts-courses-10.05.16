/**
 * Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
 * цифры и специальные символы должны остаться на месте
 * s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
 * s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
 * s1tar3t 2   low5  ->  t1rat3s 2   wol5
 */

function revertWord(word:string):string {
    let replace_stack = word.match(/[a-z]/ig);
    return  [].map.call(word, (item:string):string => {
        if (item.search(/[a-z]/i) === -1) {
            return item;
        } else {
            return replace_stack.pop();
        }
    }).join('');
}

function revertSentence(str:string):string {
    return str.split(' ').map(revertWord).join(' ') ;
}

let s1 = 's1tar3t 2 hellow';
let s2 = 's1ta$%r3t 2 hel^low';
let s3 = 's1tar3t 2   low5';
console.log(s1, ' -> ', revertSentence(s1));
console.log(s2, ' -> ', revertSentence(s2));
console.log(s3, ' -> ', revertSentence(s3));