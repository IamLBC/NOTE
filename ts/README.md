# 笔记

## 声明类型

- any 任意类型，没有 typescript 类型检查和保护
- nerver 函数不可能返回 （无限循环的程序 或 抛出错误的程序）
- void 函数没有返回值
- unknown 类型未知（安全的 any 类型），接受任何类型的赋值，但不能赋值给任何非 unknown 类型 （只进不出），主要在泛型中使用
- enum 包含一组有限集合的类型 {周一 到 周天}

## 函数

> 声明函数

1. 固定参数
2. 可选参数/默认参数
3. 剩余参数

```js
function test (naem: string, age?: number, ...args: number[])
```

> 函数重载

```js
// 声明部分
function api (url: string, config?: object): void;
function api (config: object): void;
// 实现部分
function api (arg1: string | object, arg2?: object): void {
  let url: string, config: object | undefined;
  if (typeof arg1 === "string") {
    url = arg1;
    config = arg2
  } else {
    config = arg1
    url = (config as any).url
  }
}
```

## 对象和接口

> interfacce

```js
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

```js
// interface定义接口
interface IPerson {
  name: string;
  age: number;
  isMan: boolean;
  readonly idCard: number;
  phone?: number
}
```

- 多余属性检查

```js
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

// ps: 赋值一个变量类型明确 的类型时，不应该进行多余的类型推导，应该准确匹配。多余属性检查 会帮组开发者检查可能存在的拼写错误
```

- 索引属性

```js
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

```js
// 函数对象混合类型--函数和属性的混合
interface Iinit {
  (): void;
  readonly done: boolean
}

type Iinit = () => voi
// 以上两种函数接口 相同

//
const init: Iinit = (() => {
  function _init (): void {
    if(_init.done) {
      console.log("已经初始化")
      return
    }
    _init.done = true
    console.log("init")
  }
  _init.done = false // 初始化属性值
  return _init
})()

init()
init()
```

- 函数重载的列子

```js
// 定义函数重载api1
function api1 (url: string, config?: object): void;
function api1 (config: object): void;
function api1 (arg1: string | object, arg2?: object): void {
  let url: string, config: object | undefined;
  if (typeof arg1 === "string") {
    url = arg1;
    config = arg2
  } else {
    config = arg1
    url = (config as any).url
  }
}

// 定义一个函数接口
// 2. 函数接口
interface Iapi {
  (url: string, config: object): void;
  (config: object): void
}

// 定义函数重载api2
function api2 (url: string, config?: object): void;
function api2 (config: object): void;
function api2 (arg1: string | object, arg2?: object): void {
  let url: string, config: object | undefined;
  if (typeof arg1 === "string") {
    url = arg1;
    config = arg2
  } else {
    config = arg1
    url = (config as any).url
  }
}

// 用 Iapi 这个接口
export function getApi (type: true): Iapi {
  return type ? api1 : api2
}
```

> 接口继承

```js
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
