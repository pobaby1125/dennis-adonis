'use strict'

class AntlDemoController {
    async demo({ view, antl, locale }) {
        console.log(locale);
        
        return view.render( 'demo.antl', {
            greeting: antl.formatMessage('demo.greeting'),
            locale
        })
    }
}

module.exports = AntlDemoController
