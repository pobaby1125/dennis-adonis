'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')
const PermissionCheckException = use('App/Exceptions/PermissionCheckException')
const AdminUserID = 1

class Own {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, params, auth, session, response }, next, args ) {
    // call next to advance the request

    // console.log('Hello middleware');
    // console.log( 'args:', args );
    
    const entityType = args[0]
    let entity = {}

    if ( entityType === 'post' ){
      entity = await Post.find(params.id)
    }

    const own = entity.user_id === auth.user.id

    if ( !own && auth.user.id !== AdminUserID )
    {
      throw new PermissionCheckException('Permission check exception.', 403)
    }
    

    await next()
  }
}

module.exports = Own
