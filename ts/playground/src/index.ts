// // interface Iperson {
// //   name: string;
// //   isMan?: boolean;
// //   speak(content: string): void;
// // }

// // 声明 构造函数接口类型
// interface IPersonCreator {
//   new(name: string, isMan?: boolean): Iperson
// } 

// // 工厂模式
// class PersonFactory {
//   private readonly map: { [key: string]: IPersonCreator } = {}

//   register (type: string, creator: IPersonCreator) {
//     this.map[type] = creator
//   }

//   create (type: string, name: string, isMan: boolean = true): Iperson {
//     const creator = this.map[type]
//     if (!creator) {
//       throw new Error(`not find this ${type}`)
//     }
//     return new creator(name, isMan)
//   }
// }

// // 类 实现 接口的时候要实现接口中的非可选属性
// class Person implements Iperson {
//   // consturctor 的参数有 public private protected readonly 的时候会默认赋值到成员属性
//   constructor(readonly name: string, readonly isMan: boolean = true) {}

//   speak(content: string): void {
//     console.log(`person say: ${content}`)
//   }
// }

// class Coder implements Iperson {
//   constructor(readonly name: string, readonly isMan: boolean = true) {}
  
//   speak(content: string): void {
//     console.log(`coder say: ${content}`)
//   }
// }

// class Designer implements Iperson {
//   constructor(public name: string, readonly isMan: boolean = true) {}
  
//   speak(content: string): void {
//     console.log(`designer say: ${content}`)
//   }
// }

// const factory = new PersonFactory();
// factory.register("", sPerson)
// factory.register("coder", Coder) 
// factory.register("designer", Designer)

// factory.create("", "james").speak("i am james")
// factory.create("coder", "jane", false).speak("i am jane")
// factory.create("designer", "jack").speak("i am jack")



// // class Person {
// //   constructor(readonly name: string, readonly isMan: boolean = true) {}
// //   speak(content: string): void {
// //     console.log(content)
// //   }
// // }

// // const jame = new Person("jame")
// // const jane = new Person("jane", false)

// class eachPerson {
//   constructor(private persons: Iperson[]) {}

//   // this参数放第一个参数位，调用时不用管
//   each(action: (this: Iperson) => void) {
//     for (const p of this.persons) {
//       action.call(p)
//     }
//   }
// }




// new eachPerson([jame, jane]).each(function () {
//   this.speak("say")
// })

// class Person {
//   age?: number;
//   constructor(readonly name: string, readonly isMan: boolean = true) {}
//   speak(content: string): void {
//     console.log(content)
//   }
// }

// interface Iperson {
//   name: string;
//   isMan?: boolean;
//   age?: number;
//   speak(content: string): void;
// }

// class PersonBuild {
//   name?: string;
//   isMan?: boolean;
//   age?: number;
//   setName (name: string): this {
//     this.name = name
//     return this
//   }
//   setIsMan (isMan: boolean): this {
//     this.isMan = isMan
//     return this
//   }
//   setAge (age: number): this {
//     this.age = age
//     return this
//   }
//   build(): Person {
//     const person = new Person(this.name ?? "not name", this.isMan);
//     person.age = this.age
//     return person
//   }
// }

// const jame: Iperson = new PersonBuild()
//   .setName("ja me")
//   .setIsMan(false)
//   .setAge(18)
//   .build()

// console.log(jame)


// class Person {
//   name?: string;
//   static readonly defaultName = "defaultName"

//   static speakStatic(content: string): void {
//     console.log(`${this.defaultName} say: ${content}`)
//   }
//   speak(content: string): void {
//     console.log(content)
//   }
// }

// const v = 15;
// class Test {
//   static v: number = 10;
//   v: number = 5;
//   private vv: number = 0;

//   static func (): void {
//     console.log(this.v) // 10
//     console.log(vv) // 15
//   }
// }

// const a = new Test()
// console.log(a.v)

// function lbc (t: Test) {
//   console.log(t.v, "test")
// }
// lbc(a)


// class Test {
//   private vv: number = 0;

//   static func (): void {
//     console.log(vv) // 15
//   }
// }

// interface ISoftwareEngineer {
//   work(): void;
// }

// // 抽象类不能直接new
// //抽象类可以不写具体实现逻辑，由子类来做具体实现
// abstract class SoftwareEngineer implements ISoftwareEngineer {
//   // 父类中定义方法调用，代码实现由子类完成
//   work(): void {
//     this.onWorking()
//     this.onLogging()
//   }
//   protected abstract onWorking(): void;
//   protected abstract onLogging(): void;
// }

// class Coder extends SoftwareEngineer {
//   protected onWorking(): void {
//     console.log('do work')
//   }
//   protected onLogging(): void {
//     console.log('write log')
//   }
// }

// const coder: ISoftwareEngineer = new Coder()
// coder.work()

// const jamename = "jame"
// const namea: "jame" = "jame"


// interface IApiSuccess {
//   success: true;
//   data: string;
// }

// interface IApiFaild {
//   success: false;
//   code: string;
//   message: string;
// }

// type T = IApiSuccess | IApiFaild
// function handle(res: T): void {
//   if (res.success) {
//     console.log(res.data)
//   } else {
//     const {code, message} = res;
//     console.log(`[Error: ${code}] ${message}`)
//   }
// }

// handle({success: true, data: "api success"});
// handle({success: false, code: "123", message: "api faild"});

// enum stat {
//   a,
//   b,
//   c,
//   d
// }

// console.log(stat,'stat')

// type IPerson = {name: string, isMan: boolean};

// interface IMap<TKey, TValue> {};

// type IStringMap<T> = IMap<string, T>;

// type KeyType = string | number;

// type IX = IPerson | IAnimal;

// interface IX extends IPerson, IAnimal {};

// function createMap<TModel> (
//   items: TModel[]
// ) {
//   console.log(items[0].id)
// }

// interface IBase {
//   id: string
// }

// function createMap<TModel extends IBase> (
//   items: TModel[]
// ) {
//   console.log(items[0].id)
// }

// type IPerson = {
//   name: string,
//   age: number,
//   isMan: boolean,
// }

// type copyPerson = {
//   [k in keyof IPerson]: IPerson[k]
// }





function seal (ctor: new (...ages: any) => any) {
  Object.seal(ctor)
  Object.seal(ctor.prototype)
}

function propDecorator () {
  return function (target: unknown, key: string) {
    console.log("[key]", key)
  }
}

function methodDecorator () {
  return (
    target: unknown,
    key: string,
    // PropertyDescriptor 是标准库里的
    descriptor: PropertyDescriptor
  ) => {
    console.log("[prop decorator]", key)
    console.log("[descriptor decorator]", descriptor)
  }
}

@seal
class Hello {
  @propDecorator()
  name: string = "libingcheng";
  @propDecorator()
  age: number = 16;

  @methodDecorator()
  greet () {
    console.log(`name is ${this.name}`)
  }
}