

## Sleep (睡眠)
通过返回一个 Promise 延迟执行 async 函数，把它放到睡眠状态。
```js
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
/*
async function sleepyWork() {
  console.log('I\'m going to sleep for 1 second.');
  await sleep(1000);
  console.log('I woke up after 1 second.');
}
*/
```

## Promisify (promise转化)
使用 currying 返回一个函数，返回一个调用原始函数的 Promise。
使用 ...rest 运算符传入所有参数。

In Node 8+, you can use util.promisify

Node 8 版本以上，你可以使用 util.promisify
```js
const promisify = func =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) =>
        err ? reject(err) : resolve(result))
    );
// const delay = promisify((d, cb) => setTimeout(cb, d))
// delay(2000).then(() => console.log('Hi!')) -> Promise resolves after 2s
```
## Run promises in series (队列运行promise)
使用 Array.reduce() 通过创建一个 promise 链来运行一系列 promise，每个 promise 在解析时返回下一个 promise。
```js
const series = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise(r => setTimeout(r, d))
// series([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete
```