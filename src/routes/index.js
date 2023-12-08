import Router from '@koa/router'
import user from './userRoutes.js'




const API_V1_ROUTER = new Router({ prefix: '/api/v1' })

API_V1_ROUTER.get('/', (ctx) => {ctx.ok ({message: 'Hello World'})})
API_V1_ROUTER.use('/users', user.routes(), user.allowedMethods())



export { API_V1_ROUTER }
