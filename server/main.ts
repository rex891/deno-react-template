import {
  Application,
  Context,
  Next,
  Router,
  send,
} from 'https://deno.land/x/oak@v12.5.0/mod.ts'
import { bgBrightRed } from 'https://deno.land/std@0.196.0/fmt/colors.ts'
import 'https://deno.land/x/dotenv/load.ts'
import { join } from 'https://deno.land/std@0.196.0/path/mod.ts'
import { exists } from 'https://deno.land/std@0.196.0/fs/mod.ts'

const app = new Application()
const apiRouter = new Router({ prefix: '/api' })

async function staticFileMiddleware(ctx: Context, next: Next) {
  const root = `${Deno.cwd()}/client/dist`
  const path = ctx.request.url.pathname

  if (await exists(join(root, path), { isFile: true })) {
    await send(ctx, path, { root })
  } else {
    await next()
  }
}
apiRouter.get('/dude', ctx => {
  ctx.response.body = Deno.cwd()
})

app.use(staticFileMiddleware)
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())
app.use(async ctx => {
  if (ctx.response.status === 404) {
    const root = join(Deno.cwd(), 'client/dist/')

    await ctx.send({ root, path: 'index.html' })
  }
})

console.log(bgBrightRed(`started on port: ${Deno.env.get('PORT')}`))

await app.listen({ port: parseInt(Deno.env.get('PORT')!) })
