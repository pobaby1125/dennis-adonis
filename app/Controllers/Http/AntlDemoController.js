'use strict'

class AntlDemoController {
    async demo({ view, antl, locale }) {

        return view.render( 'demo.antl', {
            greeting: antl.formatMessage('demo.greeting'),
            locale,
            message: 'hello'
        })
    }
}

module.exports = AntlDemoController
