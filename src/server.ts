
import * as Koa from 'koa'
import * as serve from 'koa-static'
import { log } from 'logger'
import { join } from 'path'

const port = process.env.PORT || 3000

const app = new Koa()
app.use(serve(join(__dirname, '..', 'public')))

app.use(async ctx => {
  ctx.body = 'Hello World!'
})

app.listen(port, () => {
  log(`Listening on ${port}`)
})
