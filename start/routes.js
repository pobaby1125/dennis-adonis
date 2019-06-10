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

//Route.get('/hello', 'HelloController.render')

// 读取数据库
// Route.get('/posts', async()=>{
//     return await Database.table('posts').select('*')
// })

/*
Route.get('/posts', 'PostController.index')
Route.post('/posts', 'PostController.store')
Route.get('/posts/create', 'PostController.create')
Route.get('/posts/:id', 'PostController.show')
Route.patch('/posts/:id', 'PostController.update')
Route.delete('/posts/:id', 'PostController.destroy')
Route.get('/posts/:id/edit', 'PostController.edit')
*/

//以上可以浓缩为下面写法
Route.resource('/posts', 'PostController')
//.except(['index'])
//.only(['index','show'])
//.apiOnly()

//命名路由
Route.get('/hello', 'HelloController.render')
     .as('users.index')

// 路由群组     
Route.group( ()=>{
     Route.get('users', ()=>'Manage users')
     Route.get('posts', ()=>'Manage posts')
})
.prefix('admin')


// 单页面应用的路由
Route.any('*',({view})=>view.render('welcome'))