import t from 'tap'
import Fastify from 'fastify'
import { join, resolve } from 'path'
import { readFileSync } from 'fs'
import { config } from 'dotenv'
config()

import App from '../../../src/app'

const { version } = JSON.parse(
  readFileSync(join(resolve(), 'package.json'), 'utf8')
)

t.test('Status API', async t => {
  t.plan(2)

  const fastify = Fastify()
  fastify.register(App)

  t.teardown(() => {
    fastify.close()
  })

  const statusRes = await fastify.inject({
    method: 'GET',
    path: 'api/status',
  })

  t.equal(statusRes.statusCode, 200)
  t.match(statusRes.json(), { status: 'ok', version })
})
