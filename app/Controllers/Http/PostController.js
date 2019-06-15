'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Post = use('App/Models/Post')
const User = use('App/Models/User')
const Tag  = use('App/Models/Tag')
const { validateAll } = use('Validator')
const Route = use('Route')

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const page = request.input('page')
    const prePage = 3;

    const posts = await Post
      .query()
      .orderBy('updated_at', 'desc')
      .with('user', (builder)=>{
        builder.select('id','username')
      })
      .with('user.profile')
      .paginate( page, prePage)

    return view.render( 'post.index', { ...posts.toJSON() } )
  } 

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    const users = await User.all()
    const tags  = await Tag.all()
    return view.render('post.create', { users: users.toJSON(), tags: tags.toJSON() })
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {

    const rules = {
      title: 'required',
      content: 'required'
    }

    const validation = await validateAll(request.all(), rules)

    if (validation.fails())
    {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const newPost = request.only(['title','content'])
    const tags = request.input('tags')
    
    const user = await User.find(request.input('user_id'))
    const post = await user
      .posts()
      .create(newPost)

    await post
      .tags()
      .attach(tags)

    // const post = await Post.create(newPost)

    return response.redirect(`/posts/${post.id}`)
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const post = await Post.findOrFail(params.id)
    const tags = await post
      .tags()
      .select('id', 'title')
      .fetch()

    return view.render('post.show',{post, tags:tags.toJSON()})
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const _post = await Post.findOrFail(params.id)

    const _user = await User.all()
    const user = _user.toJSON()

    const _tags = await Tag.all()
    const tags = _tags.toJSON()     // 作为复选框选项

    await _post.load('tags')        // 把标签选项追加到post中
    const post = _post.toJSON()
    const postTagIds = post.tags.map(tag=>tag.id)    // 得到post拥有的标签

    const tagItems = tags.map( (tag) => {
       if ( postTagIds.includes(tag.id) ){
         tag.checked = true
       }

       return tag
    })

    const userItems = user.map( (user) => {
      if ( user.id == post.user_id ){
        user.checked = true
      }

      return user
    })

    return view.render('post.edit', { 
      post, 
      users: userItems,
      tags: tagItems
    })
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {
    const { title, content, user_id, tags } = request.all()
    // const updatedPost = request.only(['title','content'])

    const post = await Post.findOrFail(params.id)
    post.merge({title, content})
    await post.save()
  
    const user = await User.find(user_id)
    await post.user().associate(user)

    await post.tags().sync(tags)

    session.flash({
      type: 'primary',
      message: `Post updated. <a href="${ Route.url('PostController.show', { id: post.id }) }" class="alert-link">Preview post</a>`
    })

    return response.redirect('back')
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)

    try{
      await post.tags().detach()
      await post.delete()
    }catch(error){
      console.log(error);
    }
    
    return 'success'
  }
}

module.exports = PostController
