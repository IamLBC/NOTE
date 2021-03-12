console.log("start ts learn")



interface IPerson {
  name: string;
  age: number;
  [key: string]: unknown;
  [index: number]: number;
}
const someone = {
  name: "libingcheng",
  age: 18,
  mobile: 17308001234,
  sdf: undefined
}

// const jame: IPerson = {
//   name: 'jame',
//   age: 18,
//   isMan: true,
//   mobile: 17308001234
// }

// const jame: IPerson = someone


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

interface Iapi {
  (url: string, config: object): void;
  (config: object): void
}

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

export function getApi (type: true): Iapi {
  return type ? api1 : api2
}


interface Iperson {
  name: string;
  age: number;
  isMan?: boolean;
  phone?: number;
}

const jack: Iperson = {
  name: "jack",
  age: 18
}

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
    console.log("use typescript ")
  }
}

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
    console.log("use typescript")
  },
  designTool: "AI",
  design() {
    console.log("do design")
  }
}

// 子接口的值可以赋值给父接口
let person: Iperson;
person = jack;
person = john;

// // 父接口的值不能赋值给子接口
// let developer: Ideveloper;
// developer = jack
