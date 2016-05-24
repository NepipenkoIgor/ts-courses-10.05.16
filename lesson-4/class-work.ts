// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
//http://electron.atom.io/
class MathLib {
    @logMethod
    public areaOfcircle(r:number):number {
        return Math.PI * r ** 2;
    }
}

function logMethod(target:any, key:string, discriptor:any):any {
    console.log(target);
    console.log(key);
    console.log(discriptor);
    console.log(this);
    let originalDesc = discriptor.value;
    discriptor.value = (...args:any[]):any=> {
        let b = args.map((a:any)=>JSON.stringify(a)).join();
        let result = originalDesc.apply(this, args);
        let r = JSON.stringify(result);
        console.log(`Call: ${key} (${b}) => ${r}`);
        return result;
    };
    return discriptor;
}

let a = new MathLib();
a.areaOfcircle(3);

// class Account {
//     @logProperty
//     public firstName;
//     public lastName;
//
//     constructor(firstName:string, lastName:string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
//
// function logProperty(target:any, key:string) {
//     let _val = target[key];
//     let getter = ():typeof _val => {
//         console.log(`Get: ${key} => ${_val}`);
//         return _val;
//     };
//     let setter = (newVal:any):void=> {
//         console.log(`Set: ${key} => ${newVal}`);
//         _val = newVal;
//     };
//     Object.defineProperty(target, key, {
//         get: getter,
//         set: setter,
//         enumerable: true,
//         configurable: true
//     });
// }
//
// let me = new Account('Igor', 'Nepipenko');
// let my_name = me.firstName;
// me.firstName = 'Vlad';

// @logClass
// class Person {
//     public firstName;
//     public lastName;
//
//     constructor(firstName:string, lastName:string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
//
// function logClass(target:any) {
//     return ()=> {
//         console.log(`New instance of ${target.name}`);
//         return target;
//     };
// }
//
// let firstPerson = new Person('Igor', 'Nepipenko');
// let secondPerson = new Person('Vlad', 'Zotce');


// class PersonAccount {
//     public name:string;
//     public surname:string;
//
//     constructor(name:string, surname:string) {
//         this.name = name;
//         this.surname = surname;
//     }
//
//     @readMetaData
//     public sayMessage(@logParameter msg:string):string {
//         return `${this.name} ${this.surname} : ${msg}`;
//     }
// }
//
// function logParameter(target:any, key:string, index:number):void {
//     console.log(target);
//     let metadataKey = `___log_${key}_parameters`;
//     if (Array.isArray(target[metadataKey])) {
//         target[metadataKey].push(index);
//     } else {
//         target[metadataKey] = [index];
//     }
// }
//
// function readMetaData(target:any, key:string, discriptor:any):any {
//     let metadataKey = `___log_${key}_parameters`;
//     let indices = target[metadataKey];
//     let originalDesc = discriptor.value;
//     discriptor.value = (...args:any[]):any=> {
//         console.log(`${key} arg[${indices}] : ${args[indices]}`);
//         return originalDesc.apply(this, args);
//     };
//     return discriptor;
// }
//
// let person = new PersonAccount('Igor', 'Nepipenko');
// person.sayMessage('Angular2 is awesome');
// person.sayMessage('I like TypeScript');

