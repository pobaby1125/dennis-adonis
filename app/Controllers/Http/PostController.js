'use strict'

class PostController {
    index({view}){
        const pageTitle = 'Layout Posts'
        // const user = {
        //     name: 'Dennis'
        // }
        const entities = [
            { id:1, title: 'Lemon', content:'🍋' },
            { id:2, title: 'Watermelon', content:'🍉'},
            { id:3, title: 'Apple', content:'🍎'}
        ]

        // return view.render('posts.index', {pageTitle, user, entities})

        return view.render('posts.page', {pageTitle, entities})
    }
}

module.exports = PostController
