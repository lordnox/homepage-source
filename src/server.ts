
import { join } from 'path'

import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as serve from 'koa-static'

import { log } from 'logger'

const port = process.env.PORT || 3000

const app = new Koa()
app.use(serve(join(__dirname, '..', 'public')))

app.use(bodyParser())
app.use(async ctx => {
  log(ctx.request.body)
  log(ctx.request.url)
  ctx.body = 'ok'
})

app.listen(port, () => {
  log(`Listening on ${port}`)
})
