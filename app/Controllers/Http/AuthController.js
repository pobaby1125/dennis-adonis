'use strict'

class AuthController {
    login( {view} ){
        return view.render('auth.login')
    }
}

module.exports = AuthController
