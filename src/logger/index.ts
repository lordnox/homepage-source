
import { create } from '@raynode/nx-logger'
import { transport } from '@raynode/nx-logger-debug'

const log = create({
  transport,
  namespace: ['hp'],
})

export {
  log,
}
