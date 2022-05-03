const Router = require('koa-router')

const router = new Router({
    prefix: '/products'
})

const products = [
    { id: 1, name: 'Maleta', price: 88,stock:1},
    { id: 2, name: 'Libro', price: 100,stock:1},
]

router.get('/', ctx => {
    ctx.body = {
        status: 'success',
        message: products
    }
})

router.get('/:id', ctx => {
    const productsFiltered = products.filter(b => b.id == ctx.params.id)

    if(productsFiltered.length) {
        ctx.body = productsFiltered[0]
    } else {
        ctx.response.status = 404
        ctx.body = {
            status: 'error',
            message: 'Product not found'
        }
    }
})

router.post('/', ctx => {
    if(!ctx.request.body.id || !ctx.request.body.name || !ctx.request.body.author) {
        ctx.response.status = 400
        ctx.body = {
            status: 'error',
            message: 'Bad request'
        }
    } else {
        const newProduct = products.push({
            id: ctx.request.body.id,
            name: ctx.request.body.name,
            author: ctx.request.body.author
        })
        ctx.response.status = 201
        ctx.body = {
            status: 'success',
            message: newProduct
        }
    }
})

router.delete('/:id', ctx => {
    const id = ctx.params.id
    const index = products.findIndex(b => b.id == id)
    products.splice(index, 1)
    ctx.response.status = 200

    ctx.body = {
        status: 'success',
        message: `Product deleted (${id})`
    }
})


module.exports = router