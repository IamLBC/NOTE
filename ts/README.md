# 笔记

## 声明类型

- any 任意类型，没有 typescript 类型检查和保护
- nerver 函数不可能返回 （无限循环的程序 或 抛出错误的程序）
- void 函数没有返回值
- unknown 类型未知（安全的 any 类型），接受任何类型的赋值，但不能赋值给任何非 unknown 类型 （只进不出），主要在泛型中使用
- enum 包含一组有限集合的类型 {周一 到 周天}

断言： 语法：

<类型>变量： `<string>name`

变量 as 类型: `name as string`

## 函数

> 声明函数

1. 固定参数
2. 可选参数/默认参数
3. 剩余参数

```ts
function test(naem: string, age?: number, ...args: number[]);
```

> 函数重载

```ts
// 声明部分
function api(url: string, config?: object): void;
function api(config: object): void;
// 实现部分
function api(arg1: string | object, arg2?: object): void {
  let url: string, config: object | undefined;
  if (typeof arg1 === "string") {
    url = arg1;
    config = arg2;
  } else {
    config = arg1;
    url = (config as any).url;
  }
}
```

## 对象和接口

> interfacce

```ts
// interface定义接口
interface IPerson {
  name: string;
  age: number;
  isMan: boolean;
}
// type关键字
type Person = IPerson;

const jame: IPerson = {
  name: "jame",
  age: 18,
  isMan: true,
};

function test(params: Person): void {
  console.log(params);
}
```

> 接口属性进阶

- 只读属性
- 可选属性

```ts
// interface定义接口
interface IPerson {
  name: string;
  age: number;
  isMan: boolean;
  readonly idCard: number;
  phone?: number;
}
```

- 多余属性检查

```ts
interface IPerson {
  name: string;
  age: number;
}

const someone = {
  name: "libingcheng",
  age: 18,
  mobile: 17308001234,
};

const jame: IPerson = {
  name: "jame",
  age: 18,
  mobile: 17308001234, // 报错
};

const jame: IPerson = someone; // 正确

// ps: 赋值一个变量类型明确 的类型时，不应该进行多余的类型推导，应该准确匹配。因为 多余属性检查 会帮助开发者检查可能存在的拼写错误
```

- 索引属性

```ts
// 数字索引 必须与 字符串索引 的值类型 相同 或 其子类型
// 因为 [1] 和 ["1"] 的值是同一个值
interface IPerson {
  name: string;
  age: number;
  [key: string]: string | number;
  // [key: string]: unknown;  或者是unknown
  [index: number]: number;
}
```

> 接口和函数

```ts
// 函数对象混合类型--函数和属性的混合
interface Iinit {
  (): void;
  readonly done: boolean;
}

type Iinit = () => void;
// 以上两种函数接口 相同

//
const init: Iinit = (() => {
  function _init(): void {
    if (_init.done) {
      console.log("已经初始化");
      return;
    }
    _init.done = true;
    console.log("init");
  }
  _init.done = false; // 初始化属性值
  return _init;
})();

init();
init();
```

- 函数重载的列子

```ts
// 定义函数重载api1
function api1(url: string, config?: object): void;
function api1(config: object): void;
function api1(arg1: string | object, arg2?: object): void {
  let url: string, config: object | undefined;
  if (typeof arg1 === "string") {
    url = arg1;
    config = arg2;
  } else {
    config = arg1;
    url = (config as any).url;
  }
}

// 定义一个函数接口
// 2. 函数接口
interface Iapi {
  (url: string, config: object): void;
  (config: object): void;
}

// 定义函数重载api2
function api2(url: string, config?: object): void;
function api2(config: object): void;
function api2(arg1: string | object, arg2?: object): void {
  let url: string, config: object | undefined;
  if (typeof arg1 === "string") {
    url = arg1;
    config = arg2;
  } else {
    config = arg1;
    url = (config as any).url;
  }
}

// 用 Iapi 这个接口
export function getApi(type: true): Iapi {
  return type ? api1 : api2;
}
```

> 接口继承

```ts
interface Iperson {
  name: string;
  age: number;
  isMan?: boolean;
  phone?: number;
}

const jack: Iperson = {
  name: "jack",
  age: 18,
};

// 单个继承
interface Icoder extends Iperson {
  codeTool: string;
  programe(): void;
}

const john: Icoder = {
  name: "john",
  age: 28,
  codeTool: "vs code",
  programe(): void {
    console.log("use typescript ");
  },
};

// 多个继承
interface Ideveloper extends Iperson, Icoder {
  designTool: string;
  design(): void;
}

const jame: Ideveloper = {
  name: "jame",
  age: 38,
  codeTool: "vs code",
  programe(): void {
    console.log("use typescript");
  },
  designTool: "AI",
  design() {
    console.log("do design");
  },
};

// 子接口的值可以赋值给父接口
let person: Iperson;
person = jack;
person = john;

// 父接口的值不能赋值给子接口
let developer: Ideveloper;
developer = jack;
```

## 类

> 定义和使用

```ts
接口 只包含声明
类   必须为属性赋初始值，函数要有具体实现逻辑
类   在接口的基础上增加了默认值和实现逻辑
class Person {
  name: string = "";
  age: number = "";
  isMan?: boolean; // 可选属性的初始值为undefined
  speak(content: string): void {
    console.log(`${this.name} say: ${content}`)
  }
}

```

> 类 和 接口

- 类可以实现接口

必须实现接口中声明的非可选成员

```ts
interface Iperson {
  name: string;
  age: number;
  isMan?: boolean;
  phone?: number;
}

// 语法 class 类名 implements 接口名 或 接口列表
class Person implements Iperson {
  // 要实现接口中所有属性和方法的声明
}
```

- 接口可以从类抽象出来

```ts
class Person {
  name: string = "";
  age: string = "";
}

// 从类中抽象接口，这种方式可以扩展属性
// Iperson接口 会有三个属性
interface Iperson extends Person {
  nike: string;
}

type Iperson = Person;
new Iperson(); // 错误  type 只能作为一个接口别名
```

> 类成员及访问权限

- 读、写访问器

如果只有 get 相当于 readonly get 更灵活

```ts
class Person {
  _name: string = "";
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}
```

- 访问权限修饰符

1. public 访问权限不受限制
2. protected 当前类或其子类可以访问
3. private 仅当前类可以访问 （说好像在什么函数里可以访问）

```ts
class Person {
  protected _idNumber: string = "";
}

const person = new Person();
console.log(person._idNumber); // 访问不了
```

> 构造函数

- 构造函数的参数

- 通过构造函数声明字段

- 构造函数接口类型

```ts
interface Iperson {
  name: string;
  isMan?: boolean;
  speak(content: string): void;
}

// 声明 构造函数接口类型
interface IPersonCreator {
  new (name: string, isMan?: boolean): Iperson;
}

// 工厂模式
class PersonFactory {
  private readonly map: { [key: string]: IPersonCreator } = {};

  register(type: string, creator: IPersonCreator) {
    this.map[type] = creator;
  }

  create(type: string, name: string, isMan: boolean = true): Iperson {
    const creator = this.map[type];
    if (!creator) {
      throw new Error(`not find this ${type}`);
    }
    return new creator(name, isMan);
  }
}

// 类 实现 接口的时候要实现接口中的非可选属性
class Person implements Iperson {
  // consturctor 的参数有 public private protected readonly 的时候会默认赋值到成员属性
  constructor(readonly name: string, readonly isMan: boolean = true) {}

  speak(content: string): void {
    console.log(`person say: ${content}`);
  }
}

class Coder implements Iperson {
  constructor(readonly name: string, readonly isMan: boolean = true) {}

  speak(content: string): void {
    console.log(`coder say: ${content}`);
  }
}

const factory = new PersonFactory();
factory.register("", Person);
factory.register("coder", Coder);

factory.create("", "james").speak("i am james");
factory.create("coder", "jane", false).speak("i am jane");
```

> this

- this 引用
- this 参数

```ts
interface Iperson {
  name: string;
  isMan?: boolean;
  speak(content: string): void;
}

class Person {
  constructor(readonly name: string, readonly isMan: boolean = true) {}
  speak(content: string): void {
    console.log(content);
  }
}

const jame = new Person("jame");
const jane = new Person("jane", false);

class eachPerson {
  constructor(private persons: Iperson[]) {}

  // this参数放第一个参数位，调用时不用管
  each(action: (this: Iperson) => void) {
    for (const p of this.persons) {
      action.call(p);
    }
  }
}

new eachPerson([jame, jane]).each(function () {
  this.speak("say");
});
```

- this 类型 - this 可以作为方法的返回值类型，方便链式调用，适用于构建器模式

```ts
class Person {
  age?: number;
  constructor(readonly name: string, readonly isMan: boolean = true) {}
  speak(content: string): void {
    console.log(content);
  }
}

interface Iperson {
  name: string;
  isMan?: boolean;
  age?: number;
  speak(content: string): void;
}

class PersonBuild {
  name?: string;
  isMan?: boolean;
  age?: number;
  setName(name: string): this {
    this.name = name;
    return this;
  }
  setIsMan(isMan: boolean): this {
    this.isMan = isMan;
    return this;
  }
  setAge(age: number): this {
    this.age = age;
    return this;
  }
  build(): Person {
    const person = new Person(this.name ?? "not name", this.isMan);
    person.age = this.age;
    return person;
  }
}

const jame: Iperson = new PersonBuild()
  .setName("jame")
  .setIsMan(false)
  .setAge(18)
  .build();

console.log(jame);
```

> 类的 静态成员

类 --> 本质上是一个函数 --> 函数也可以看作对象

所以类可以看作对象

```ts
// 静态方法中不能直接访问实例成员
// 静态方法中this指向静态成员
const v = 15;
class Test {
  static v: number = 10;
  v: number = 5;

  static func(t: Test): void {
    console.log(this.v); // 10
    console.log(v); // 15
    console.log(t.v); // 5  用参数传入
  }
}
```

> 类的继承

```ts
class Father {
  constructor(protected type: string) {}
  report() {
    console.log(`type is: ${this.type}`);
  }
  work() {
    console.log(`i am working`);
  }
}

class Son extends Father {
  constructor() {
    super("son"); // 调用父类构造器
  }
  work() {
    // 重写父类方法
    super.work(); // 重写也可以调用父类方法
    console.log(`i am coding`);
  }
}

const coder = new Son();
coder.report(); // type is: son  子类可以调用父类中 protected 类型的属性
coder.work(); // i am working   i am coding
```

> 抽象类

```ts
interface ISoftwareEngineer {
  work(): void;
}

// 抽象类不能直接new
//抽象类可以不写具体实现逻辑，由子类来做具体实现
abstract class SoftwareEngineer implements ISoftwareEngineer {
  // 父类中定义方法调用，代码实现由子类完成
  work(): void {
    this.onWorking();
    this.onLogging();
  }
  protected abstract onWorking(): void;
  protected abstract onLogging(): void;
}

class Coder extends SoftwareEngineer {
  protected onWorking(): void {
    console.log("do work");
  }
  protected onLogging(): void {
    console.log("write log");
  }
}

const coder: ISoftwareEngineer = new Coder();
coder.work();
```

## 高级类型

> 字面量类型

- 单个字符串、数值、布尔值可以作为类型使用，称为字面类型

- 字面类型只可能赋予类型相同的值

- 是帮助 ts 在静态分析时更准确的推断类型

- 字面类型可以联合，联合的字面类型可以限制变量的赋值范围

```ts
interface IApiSuccess {
  success: true;
  data: string;
}

interface IApiFaild {
  success: false;
  code: string;
  message: string;
}

type T = IApiSuccess | IApiFaild;
function handle(res: T): void {
  if (res.success) {
    console.log(res.data);
  } else {
    const { code, message } = res;
    console.log(`[Error: ${code}] ${message}`);
  }
}

handle({ success: true, data: "api success" });
handle({ success: false, code: "123", message: "api faild" });
```

> 枚举类型 enum

- 枚举值允许是 number 或 string 类型的字面量或字面量表达式

- 枚举类型可以转译成 js 中的对象

- const 类型不会转成 js 对象，const 枚举会直接转译成它对应的值

- 所有值是数值的枚举，转译成 js 对象是双向映射表, 如果没有赋值会自动赋予升序数值类型

- 所有值是字符串的枚举，转译成 js 对象是单向映射表

```ts
enum stat {
  a,
  b,
  c,
  d,
}

console.log(stat, "stat");
```

> 泛型

- 泛型就是 为类型添加参数，使之可以 广泛表示一系列类型 的类型

- 匿名函数的类型参数放在`function`关键字后

- 可以为类型设置默认类型 `<T = string>`

- 使用`extends`关键字约束类型参数范围

```ts
泛型约束：
// 如果要取TModel里的某一个属性，ts会认为TModel里的id的类型为 string 或 undefined， 会报错
function createMap<TModel>(items: TModel[]) {
  console.log(items[0].id);
}

// 解决办法是用接口继承，保证TModel里面绝对有id属性
interface IBase {
  id: string;
}

function createMap<TModel extends IBase>(items: TModel[]) {
  console.log(items[0].id);
}
```

> 类型映射

常见的类型计算：

```ts
// 类型别名，和赋值语句中的逻辑相似
type IPerson = { name: string; isMan: boolean };

// 有函数的感觉
interface IMap<TKey, TValue> {}

// 像函数调用
type IStringMap<T> = IMap<string, T>;

// 联合类型 也是一种运算 逻辑：或 的语法运算
type KeyType = string | number;

// 类型的合并运算，可以改为用`extends`继承
type IX = IPerson | IAnimal;
interface IX extends IPerson, IAnimal {}
```

```ts
type IPerson = {
  name: string;
  age: number;
  isMan: boolean;
};

type copyPerson = {
  [k in keyof IPerson]: IPerson[k] | undefined;
};

// 设置全部可选
[k in keyof IPerson]?: IPerson[k]

// 只读
readonly [k in keyof IPerson]: IPerson[k]

// 去掉只读
-readonly [k in keyof IPerson]: IPerson[k]
```

> 预置工具类型

> 装饰器 Decorator

js 已提议

ts 需要在配置项中打开`experimentalDecorators`开启`Decorator`

装饰器只能用于类和类的方法，不能用于函数，因为存在函数提升（阮一峰 es6）

`Decorator`可以装饰五种类型：

- 类

  语法：function 名称（原始对象）{ ... }

```ts
function seal(ctor: new (...ages: any) => any) {
  Object.seal(ctor);
  Object.seal(ctor.prototype);
}

@seal
class Hello {}

// 用工厂函数 更灵活
function seal(sealCrot: boolean = true, sealProto: boolean = true) {
  return function (ctor: new (...ages: any) => any) {
    if (sealCrot) {
      Object.seal(ctor);
    }

    if (sealProto) {
      Object.seal(ctor.prototype);
    }
  };
}

// 用工厂函数时 写（）
@seal(false, false)
class Hello {}
```

- 类的属性

  语法：function 名称（
  原始对象：unknown, // 通常是 unknown 或 any
  属性名称： string | symbol
  ）{ ... }

```ts
function propDecorator() {
  return function (target: unknown, key: string) {
    console.log("[key]", key);
  };
}

class Hello {
  @propDecorator()
  name: string = "libingcheng";
  @propDecorator()
  age: number = 16;
}
```

- 类的方法

  语法：function 名称（
  原始对象：unknown, // 通常是 unknown 或 any
  方法名称： string | symbol,
  属性描述符： PropertyDescriptor
  ）{ ... }

```ts
function methodDecorator() {
  return (
    target: unknown,
    key: string,
    // PropertyDescriptor 是标准库里的
    descriptor: PropertyDescriptor
  ) => {
    console.log("[prop decorator]", key);
    console.log("[descriptor decorator]", descriptor);
  };
}

class Hello {
  name: string = "libingcheng";

  age: number = 16;

  @methodDecorator()
  greet() {
    console.log(`name is ${this.name}`);
  }
}

// PropertyDescriptor 是Object.defineProperty(obj, key, descriptor) 中的descriptor
interface PropertyDescriptor {
  value?: any;
  writable?: boolean;
  get?(): any;
  set?(): any;
  configurable?: boolean;
  enumerable?: boolean;
}
```

- 类的访问器 get 和 set

语法和方法装饰器一样，但是`get`和`set`只能装饰一个，因为`get`和`set`描述的是同一个属性

- 类的方法的参数

  语法：function 名称（
  原始对象：unknown, // 通常是 unknown 或 any
  参数名称名称： string | symbol,
  参数的位置： index
  ）{ ... }

```ts
class Hello {
  name: string = "libingcheng";

  age: number = 16;

  greet(@paramsDecorator name: string) {
    console.log(`name is ${this.name}`);
  }
}
```
