'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsAddContentColumnSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      // alter table
      table.string('auther')
    })
  }

  down () {
    this.table('posts', (table) => {
      // reverse alternations
      table.dropColumn('auther')
    })
  }
}

module.exports = PostsAddContentColumnSchema
