import { src, dest, watch, series } from "gulp";
import { exec } from "child_process"
import ts from "gulp-typescript";

const tsCfg = ts.createProject("tsconfig.json")

function compile () {
  // 用gulp-typescript来编译ts
  const result = src("src/**/*.ts").pipe(tsCfg())
  // 便已完成 输出js到dist
  return result.js.pipe(dest("./dist/"))
}

async function run(): Promise<any> {
  return new Promise(resolve => {
    // 运行js文件
    exec("node ./dist/", (err, stdout, stderr) => {
      console.log(stdout)
      if (stderr) {
        console.log(stderr, "stderr")
        resolve(stderr)
      }
      resolve(err)
    })
  })
}

function watchTs () {
  // 监听所有ts文件变化
  // 执行序列操作 编译和运行
  watch("src/**/*.ts", series(compile, run))
  console.log("start watching...")
}

// 查看gulp任务list 
// npx gulp --tasks

// 导出任务名
export {compile, watchTs as watch}

// 默认任务
export default series(compile, run)
