'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers')
const Files   = use('App/Models/File')
const Drive   = use("Drive")
const Route   = use('Route')

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Show a list of all files.
   * GET files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const _files = await Files.all()
    const files = _files.toJSON()

    return view.render('file.index', { files })
  }

  /**
   * Render a form to be used for creating a new file.
   * GET files/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    return view.render('file.create')
  }

  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    // 获取上传文件
    const file = request.file('file', {
      types: ['image', 'video'],
      size: '200mb'
    })

    // 移动上传的文件到 /public/uploads
    const fileName = `${ new Date().getTime() }.${ file.subtype }`
    await file.move( Helpers.publicPath('uploads'), {
      name: fileName
    } )

    if (!file.moved()){
      const error = file.error()

      session.flash({
        type:'warning',
        message: `<small>${ error.clientName }</small>：${ error.message }`
      })

      return response.redirect('back')
    }

    Files.create({
      client_name: file.clientName,
      file_name: fileName,
      type: file.type,
      subtype: file.subtype,
      size: file.size
    })

    session.flash({
      type:'success',
      message: `<small>${ file.clientName }</small>：Successfully uploaded.`
    })

    return response.redirect('back')
  }

  /**
   * Display a single file.
   * GET files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const _file = await Files.find( params.id )
    const file =  _file.toJSON()

    return view.render('file.show', { file })
  }

  /**
   * Render a form to update an existing file.
   * GET files/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const file = await Files.find( params.id )
    return view.render('file.edit', {file} )
  }

  /**
   * Update file details.
   * PUT or PATCH files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {
    const fileData = await Files.find( params.id )
    const { client_name, file_name } = request.all()

    // 文件名不重复
    if ( fileData.file_name !== file_name ){
      try{
        const basePath = Helpers.publicPath('uploads')
        const originalFilePath = `${ basePath }/${ fileData.file_name }`
        const filePath = `${ basePath }/${ file_name }`
        await Drive.move( originalFilePath, filePath )
      }catch(error){
        session.flash({
          type: 'warning',
          message: error.message
        })

        return response.redirect('back')
      }
    }

    // 更新数据信息
    fileData.merge({ client_name, file_name })
    await fileData.save()

    session.flash({
      type:'success',
      message: 'Successfully updated.'
    })

    return response.redirect('back')
  }

  /**
   * Delete a file with id.
   * DELETE files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, session }) {

    try{
      const fileData = await Files.findOrFail(params.id)
      const filePath = `${ Helpers.publicPath('uploads') }/${ fileData.file_name }`

      await Drive.delete(filePath)    // 删除文件
      await fileData.delete()          // 删除数据

      session.flash({
        type: 'success',
        message: `<small>${ fileData.client_name }：</small>successfully deleted.`
      })

      return response.redirect( Route.url('files.index') )

    }catch(error){
      session.flash({
        type: 'warning',
        message: error.message
      })

      return response.redirect('back')
    }

  }

  /**
   *  Download file
   */
  async download({ params, response }){
    const file = await Files.find(params.id)
    const filename = `${ Helpers.publicPath('uploads') }/${ file.file_name }`
    response.attachment( filename, file.client_name )
  }
}

module.exports = FileController
