'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class LocaleSwitch {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, locale, session, antl }, next) {
    // call next to advance the request
    const _locale = session.get('locale') || locale
    antl.switchLocale(_locale)

    await next()
  }
}

module.exports = LocaleSwitch
