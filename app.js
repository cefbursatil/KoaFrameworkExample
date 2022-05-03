const Koa = require('koa')
const app = new Koa()

app.use(async ctx => {
    ctx.body = 'Ecommerce'
})

app.listen(3000)