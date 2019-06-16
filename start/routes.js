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

Route
    .group( () =>{
        Route.get('profile', 'ProfileController.edit').as('profile.edit')
        Route
            .post('profile', 'ProfileController.update')
            .as('profile.update')
            .validator('UpdateProfile')
        Route.get('password', 'PasswordController.edit').as('password.edit')
        Route
            .post('password', 'PasswordController.update')
            .as('password.update')
            .validator('UpdatePassword')
    })
    .prefix('settings')
    .middleware(['auth'])

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
    .validator('LoginUser')   

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
    .validator(new Map([
        [['posts.store', 'posts.update'], ['StorePost']]
      ]))


Route
    .resource('users','UserController')
    .validator( new Map([
        [['users.store'],['StoreUser']]
    ]) )

Route.resource('profiles','ProfileController')
Route.resource('tags','TagController')

