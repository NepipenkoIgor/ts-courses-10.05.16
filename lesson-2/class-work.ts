// function getAverage(a:number, b:number, c:number):string {
//     let total = a + b + c;
//     let average = total / 3;
//     return `The averag is ${average}`;
// }
// let result = getAverage(4, 3);
// console.log(result);


// interface Foo {
//     foo:string;
// }
// function foo(someParam:Foo):Foo {
//     return someParam;
// }
// foo({foo:'foo'});


// function getAverage(a:number, b:number, c?:number):string {
//     let total = a;
//     let count = 1;
//     total += b;
//     count++;
//     if (typeof c !== 'undefined') {
//         total += c;
//         count++;
//     }
//     let average = total / count;
//     return `The averag is ${average}`;
// }
// let result = getAverage(4, 3);

// function getAverage(a:number, b:number, c:number=0):string {
//     let total = a + b + c;
//     let average = total / 3;
//     return `The averag is ${average}`;
// }
//
// let result = getAverage(4, 3);
// type a=number|string;
// function getAverage(...a:a[]):string {
//     let total = 0;
//     let count = 0;
//     for (let i = 0; i < a.length; i++) {
//         total += a[i];
//         count++;
//     }
//     let average = total / count;
//     return `The averag is ${average}`;
// }
// getAverage(1,3,4,5,6,6,'sd');


// function getAverage(a:string, b:string, c:string):string;
// function getAverage(a:number, b:number, c:number):string;
// function getAverage(a:any, b:any, c:any):string {
//     let total = parseInt(a, 10) + parseInt(b, 10) + parseInt(c, 10);
//     let average = total / 3;
//     return `The averag is ${average}`;
// }
// getAverage('2',1,2,4);

// class Handler {
// }
// class RandomHandler {
// }
// class ReversedHandler {
// }
//
// function getHandler(a:'myStringName'):RandomHandler;
// function getHandler(a:'Lena'):ReversedHandler;
// function getHandler(a:string):Handler;
// function getHandler(a:string):Handler {
//     switch (a) {
//         case 'myStringName':
//             return new RandomHandler();
//         case 'Lena':
//             return new ReversedHandler();
//         default:
//             return new Handler();
//     }
// };
//
// getHandler('myStringName')


// interface Animation {
//     delayX:number;
//     delayY:number;
//     easing:'easy-in'|'easy-out';
// }
//
// let animation:Animation = {
//     delayX: 10,
//     delayY: 20,
//     easing: 'easy-in'
// };

// class Point {
//     x:number;
//     y:number;
//
//     constructor(x:number, y:number) {
//         this.x = x;
//         this.y = y;
//     }
//
//     addCoord():number {
//         return this.x + this.y;
//     }
// }
//
// let point = new Point(10, 10);
// point.addCoord();

// interface IFoo {
//     x:number;
//     someMethodNew():number;
// }
// interface IBar {
//     y:number;
// }
//
// class Foo implements IFoo,IBar {
//     public x:number;
//     public y:number;
//     private c:number;
//     protected z:number;
//
//     public someMethodNew():number {
//         return 5;
//     }
// }

// let foo = new Foo();
//
// class Bar extends Foo {
//     constructor() {
//         super();
//     }
//     someMethod():number {
//         super.someMethod();
//         return 5;
//     }
// }

// class Foo {
//     static instance = 0;
//
//     constructor() {
//         Foo.instance++;
//     }
// }
//
// let ins1 = new Foo();
// let ins2 = new Foo();
//
// console.log(Foo.instance);


// class Foo {
//     private name;
//
//     set nameMethod(name:string) {
//         this.name = name;
//     }
//
//     get nameMethod():string {
//         return this.name;
//     }
// }
//
//
// let foo = new Foo();
// foo.nameMethod = 'Igor';
// console.log(foo.nameMethod);
//
// abstract class AbstractFoo {
//     abstract aabstractMethod():number;
// }
//
// class Foo extends AbstractFoo {
//     aabstractMethod():number {
//         return 1;
//     }
// }