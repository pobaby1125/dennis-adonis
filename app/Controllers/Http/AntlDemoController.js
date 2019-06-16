'use strict'

const Formats = use('Antl/Formats')

Formats.add('longWeekDay', {
    weekday: 'long'
})

class AntlDemoController {

    async localeSwitch ({ session, response, request }){
        session.put('locale', request.input('locale'))
        return response.redirect('back')
    }

    async demo({ view, antl, locale, session }) {

        const _locale = session.get('locale') || locale
        
        return view.render( 'demo.antl', {
            greeting: antl.formatMessage('demo.greeting'),
            locale: _locale,
            message: antl.formatMessage('demo.message', {
                gender:'male'
            }),
            candy: antl.formatMessage('demo.candy', {
                count: 0
            }),
            /*
            message: antl.formatNumber(30, {
                style: 'currency',
                currency: 'cny'
            })
            */

            day: antl.formatMessage('demo.day', { today:new Date() }, [
                Formats.pass('longWeekDay', 'date')
            ])
        })
    }
}

module.exports = AntlDemoController
