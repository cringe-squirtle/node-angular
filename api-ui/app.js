import urls from './config.js'

const search = Object.keys(urls.search).map(e => ({ name: e, url: urls.search[e], text: 'game of' }))
const movie = Object.keys(urls.movie).map(e => ({ name: e, url: urls.movie[e], text: '' }))
const movie_p = Object.keys(urls.movie_p).map(e => ({ name: e, url: urls.movie_p[e], text: '464052' }))
const tv = Object.keys(urls.tv).map(e => ({ name: e, url: urls.tv[e], text: '' }))
const tv_p = Object.keys(urls.tv_p).map(e => ({ name: e, url: urls.tv_p[e], text: '85271' }))
const cast = Object.keys(urls.cast).map(e => ({ name: e, url: urls.cast[e], text: '90633' }))

class App {
    constructor() {

    }
    build() {
        this.build_param(search, 'search movie or tv', true)
        this.build_param(movie, 'movie', false)
        this.build_param(tv, 'tv', false)

        this.build_param(movie_p, 'movie with id', true)
        this.build_param(tv_p, 'tv with id', true)

        this.build_param(cast, 'cast with id', true)
    }


    build_param(item, name, type) {
        const body = document.body
        const title = document.createElement('h1')
        title.innerHTML = name

        body.appendChild(title)

        item.forEach(e => {
            const wrapper = document.createElement('p')

            const label = document.createElement('label')
            label.innerHTML = e.name
            wrapper.appendChild(label)
            const a = document.createElement('a')

            if (type) {
                a.innerHTML = e.url(e.text)
                a.href = e.url(e.text)
                const input = document.createElement('input')
                input.value = e.text

                const inputHandler = function (element) {
                    a.innerHTML = e.url(element.target.value)
                    a.href = e.url(element.target.value)
                }

                input.addEventListener('input', inputHandler)
                input.addEventListener('propertychange', inputHandler)
                wrapper.appendChild(input)

            } else {
                a.innerHTML = e.url
                a.href = e.url
            }

            wrapper.appendChild(a)
            body.appendChild(wrapper)

        });

    }
}

new App().build()


