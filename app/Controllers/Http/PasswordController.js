'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const { validateAll } = use('Validator')
const Hash = use('Hash')

/**
 * Resourceful controller for interacting with passwords
 */
class PasswordController {
 

 

  /**
   * Render a form to update an existing password.
   * GET passwords/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {

    return view.render('user.settings.password.edit')
  }

  /**
   * Update password details.
   * PUT or PATCH passwords/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session, auth }) {
    const{ new_password } = request.all()
    auth.user.password = await Hash.make(new_password)

    await auth.user.save()

    session.flash({
      type: 'success',
      message: 'Password successfully updated.'
    })

    return response.redirect('back')

  }

  
}

module.exports = PasswordController
