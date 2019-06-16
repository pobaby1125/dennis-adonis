'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Profile = use('App/Models/Profile')
const { validateAll } = use('Validator')

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {
  /**
   * Show a list of all profiles.
   * GET profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new profile.
   * GET profiles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new profile.
   * POST profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single profile.
   * GET profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const profile = await Profile.find(params.id)
    const user = await profile
      .user()
      .select('username')
      .fetch()
    
    return {
      profile, 
      user
    }  
  }

  /**
   * Render a form to update an existing profile.
   * GET profiles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view, auth }) {
    await auth.user.load('profile')
    return view.render('user.settings.profile.edit', { user: auth.user.toJSON() })
  }

  /**
   * Update profile details.
   * PUT or PATCH profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session, auth }) {

    /*
    const rules = {
      username: `required|unique:users,username,id,${ auth.user.id }`,
      email: `required|email|unique:users,email,id,${ auth.user.id }`,
      github: `unique:profiles,github,user_id,${ auth.user.id }`
    }

    const validation = await validateAll( request.all(), rules )

    if ( validation.fails() ){
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }
    */

    const { username, email, github } = request.all()
    auth.user.merge({ username, email })
    await auth.user.save()
    await auth.user.profile().update({ github })

    session
      .flash({
        type:'success',
        message: 'Profile successfully updated.'
      })

    return response.redirect('back')    

  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProfileController
