/**
 * Created by igor on 5/13/16.
 */
// function Person(age) {
//     this.age = age;
//     this.growOld =  () =>{
//         this.age++;
//     };
// }
//
// let person = new Person(1);
// setTimeout(person.growOld, 1000);
// setTimeout(function(){
//     console.log(person.age);
// }, 2000);
// const a:{readonly b: number} = {b: 1};
// a.b = 2;

// let rect = {x: 0, y: 10, width: 20, height: 30};
//
// let {y, x:startX, width, height}=rect;
//
// console.log(startX, y, width, height);
//
//
// let x = 1, y = 2;
// [x, y] = [y, x];
//
// console.log(x,y)


// let [x,y,...last]=[1, 2, 3, 4];
// console.log(x,y,last)

// enum Size{
//     S=44,
//     M=46,
//     L=48,
//     XL=52,
//     XXl=54
// }
//
// console.log(Size['XL'])

//
// let arr = [1,2,3,4];
//
// for (let el of arr){
//     console.log(el)
// }

// let a:void;

// class Foo{};
// interface A {
// }

// type b={};

// let a = A;

// let foo = 123;
// let bar:typeof foo;


// let a:string[]=['s','m','f'];
// let b:Array<string>;

// let f:[string,number] = ['1', 1];

// let a:{z:number,b?:string} = {z: 1};
//
// let c:typeof a;

// type = алиас
// type g={x:g};
///{x:{x:{x:}}}
// var g:{x:typeof g};

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
//
// type account={firstName:string,age:number};
//
// let profile:account;

// interface Mover {
//     move():void;
//     getStatus:()=>{speed:number};
// }
// interface Shaker {
//     shake():void;
//     getStatus:()=>{velosity:number};
// }
//
// interface MoverShaker extends Mover,Shaker {
//     getStatus:()=>{speed:number,velosity:number};
// }
// let car:MoverShaker = {
//     move: ()=> {
//
//     },
//     shake: ()=> {
//
//     },
//     getStatus: ()=> {
//         return {speed: 10, velosity: 20}
//     }
// }
// interface IBase {
//     id:number;
// }
// let base:IBase = {id: 1, name: 'Mike', male: true};
//
// interface IBase {
//     name:string;
// }
//
// interface IBase {
//     male:boolean;
// }

// function reverse<F>(list:F[]):F[] {
//     let reversedList:F[] = [];
//     for (let i = (list.length - 1); i >= 0; i--) {
//         reversedList.push(list[i]);
//     }
//     return reversedList;
// }
//
// let letters:string[] = ['a', 'b', 'c', 'd'];
// let reversedLetters = reverse<string>(letters);

// interface A<T extends {id:number,name:string}> {
//     someProp:T;
// }
//
// let b:A<{id:number,name:string,male:boolean}>;

//
// let a:string|number;
//
// a=1;
// a='sdsd';


// interface A {
//     a:string;
//     b:string;
// }
//
// interface B {
//     a:number;
//     b:number;
//     c:number;
// }
//
// let x: A|B;
// let a=x.a;
// let b=x.b;
// let c=x.c;

// interface A {
//     a:string;
// }
//
// interface B {
//     b:number;
// }
//
// let ab:A&B = {a: 'asd', b: 1};

// function n(a) {
//     if (a) {
//         interface I {
//             x:number;
//         }
//         let v:I;
//         v.x = 1;
//     } else {
//         interface I {
//             x:string;
//         }
//         let v:I;
//         v.x = 'str';
//     }
// }
