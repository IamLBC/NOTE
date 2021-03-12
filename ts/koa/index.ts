import Koa from "koa";
import serve from "koa-static-server";
import Router from "@koa/router";

console.log("hello cyylbc")

const app = new Koa()
const router = new Router()

router.get("/:name?", ctx => {
  const {name = "lbc"} = ctx.params
  ctx.body = {
    name,
    message: `hello ${name}`
  }
})

app.use(router.routes())

app.use(serve({
  rootDir: `${__dirname}/public`,
  index: "index.html"
}))

app.listen("80", () => {
  console.log("start server")
})