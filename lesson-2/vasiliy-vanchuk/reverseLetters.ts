/*
 Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
 цифры и специальные символы должны остаться на месте
 s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
 s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
 s1tar3t 2   low5  ->  t1rat3s 2   wol5
 */
function reverseLetters(inStr:string):string {
    const lettersDetectorRegexp:RegExp = /[^a-zA-Z]/g;
    const ret:string = inStr
        .split(' ')
        .map((word:string) => {
            // remove non-letters and reverse
            let reversedLetters:string[] = word
                .replace(lettersDetectorRegexp, '')
                .split('')
                .reverse();
            // paste non-letters into initial places
            word.split('')
                .forEach((item:string, index:number) => item.match(lettersDetectorRegexp) && reversedLetters.splice(index, 0, item));
            // convert to string
            return reversedLetters.join('');
        })
        .join(' ');
    return ret;
}

console.log(reverseLetters('s1tar3t 2 hellow') === 't1rat3s 2 wolleh');
console.log(reverseLetters('s1ta$%r3t 2 hel^low') === 't1ra$%t3s 2 wol^leh');
console.log(reverseLetters('s1tar3t 2   low5') === 't1rat3s 2   wol5');
