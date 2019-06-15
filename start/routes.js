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

Route.resource('files', 'FileController')
Route
    .get('upload', 'FileController.create')
    .as('upload')

Route
    .get('files/:id/download', 'FileController.download')
    .as('files.download')

Route
    .post('share/:type/:id/email', 'ShareController.email')
    .as('share.email')
    
Route
    .get('login', 'AuthController.login')
    .as('login')

Route
    .post('logout', 'AuthController.logout')
    .as('logout')    

Route
    .post('auth', 'AuthController.auth')
    .as('auth')    

Route
    .get('register', 'UserController.create')
    .as('signup')


Route
    .get( 'users/create', ({response}) => response.route('signup'))    

Route
    .resource('posts','PostController')
    .middleware(new Map([
        [ ['create', 'store', 'edit', 'update', 'destroy'], ['auth'] ],
        [ ['update', 'destroy', 'edit'], ['own:post'] ]
    ]))


Route.resource('users','UserController')
Route.resource('profiles','ProfileController')
Route.resource('tags','TagController')

