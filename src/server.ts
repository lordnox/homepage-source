
import { join } from 'path'

import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import * as serve from 'koa-static'

import * as fckCreateHandler from 'github-webhook-handler'

import { CreateHandlerOptions, handler } from 'github-webhook-handler'

const createHandler: (options: CreateHandlerOptions) => handler = fckCreateHandler as any

import { log } from 'logger'

const app = new Koa()

const router = new Router()
const port = process.env.PORT || 3000
const handler = createHandler({
  path: '/webhooks/github',
  secret: 'A7A2C229-406C-4F7D-8788-DA9269722261',
})

router.post('/webhooks/*', (ctx, next) => {
  handler(ctx.req, ctx.res, err => ctx.throw(404, err))
  return next()
})

handler.on('error', err => {
  log.error('Error:', err.message)
})

handler.on('push', event => {
  log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})

handler.on('issues', event => {
  log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

app
  .use(serve(join(__dirname, '..', 'public')))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(bodyParser())
  .use(async ctx => {
    log(ctx.request.body)
    log(ctx.request.url)
    ctx.body = 'ok'
  })
  .listen(port, () => {
    log(`Listening on ${port}`)
  })
