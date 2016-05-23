/**
 * Created by constantant on 18.05.2016.
 */

// через перегрузку тесты, на строках 23 и 24, не проходят
function summator(...numbers: (number|string)[]): number {
    let sum = 0;
    numbers.forEach(function (num: number|string, index: number) {
        let value = typeof num === 'string' ? parseFloat(num) : num;
        // скорее всего достаточно isNaN
        // думаю не достаточно, так как значение может быть любым, например объектом, и оно пройдёт все проверки если оствить только isNaN
        if (isNaN(value) || typeof value !== 'number') {
            throw new TypeError(`Argument #${index} is not valid!`);
        }
        sum += value;
    });
    return sum;
}

console.log(
    // summator('33', 1, 1, {}, 1),
    summator(1, 1, 1, 1, 1),
    summator(1, '1', 1, '1', 1),
    summator(1, '1.5', 1, '0.5', 1)
);