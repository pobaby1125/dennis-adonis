'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const users = [
      { username: 'ZhangSam', email: 'z3@qq.com', password: '111111' },
      { username: 'LiSi', email: 'l4@qq.com', password: '111111' }
    ]

    User.createMany(users)
  }
}

module.exports = UserSeeder
