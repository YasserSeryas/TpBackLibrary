import Router from '@koa/router'




const API_V1_ROUTER = new Router({ prefix: '/api/v1' })

API_V1_ROUTER.get('/', (ctx) => {ctx.ok ({message: 'Hello World'})})



export { API_V1_ROUTER }
