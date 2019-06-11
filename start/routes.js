'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Database = use('Database')
const Route = use('Route')

Route.on('/').render('welcome')

// Route.post('/posts', ({request})=>request.post())
// Route.post('/posts', ({request})=>request.collect(['title','content']))
// Route.post('/posts',({request})=>request.headers())
// Route.get('/posts',({ request, response })=>{
//      // response.cookie('theme','dark')
//      return request.cookie('themes','light')
//      // return request.cookies()
// })

/*
// 异步响应
const delay = (data, time) => {
     return new Promise( (resolve, reject) => {
          setTimeout( () =>{
               resolve(data)
          }, time )
     } )
}

Route.get('/posts', async({response}) => {
     const data = await delay(
          'List of posts.',
          3000
     )

     return data
})
*/


Route.get('/list-of-food-list', ({response})=>{
     response.route('list-of-posts', {category:'food'})
})

Route.get('/posts/:category?', ({params})=>{
     return `List of ${params.category || 'default'} posts.`
})
.as('list-of-posts')
