'use strict'

const Formats = use('Antl/Formats')

Formats.add('longWeekDay', {
    weekday: 'long'
})

class AntlDemoController {
    async demo({ view, antl, locale }) {

        return view.render( 'demo.antl', {
            greeting: antl.formatMessage('demo.greeting'),
            locale,
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
