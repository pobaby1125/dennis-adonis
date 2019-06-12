'use strict'

/*
|--------------------------------------------------------------------------
| PostTagPivotSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class PostTagPivotSeeder {
  async run () {
    await Database
      .table('post_tag')
      .insert([
        {post_id:4, tag_id:1},
        {post_id:4, tag_id:2},
        {post_id:5, tag_id:2},
        {post_id:6, tag_id:1},
        {post_id:6, tag_id:2},
        {post_id:7, tag_id:2},
        {post_id:9, tag_id:1}
      ])
    
      
  }
}

module.exports = PostTagPivotSeeder
