const https = require('https');
const config = require('./config')
const axios = require('axios');

function get_avartar(avatar) {
    if (avatar === null)
        return config.urls.review(avatar)
    else if (avatar.indexOf('https://') == 1)
        return avatar.slice(1, avatar.length)
    else
        return config.urls.review(avatar)
}



function fetch(url, callback1, callback2) {
    https.get(url, (re) => {
        let data = ''
        re.on('data', (d) => {
            data += d
        });
        re.on('end', () => {
            const ans = JSON.parse(data)
            if (ans.success === false) {
                callback1(ans)
            } else {
                try {
                    callback2(ans)
                } catch (e) {
                    callback1(e.message)
                }
            }
        });

    }).on('error', (e) => {
        callback1(JSON.parse(e))
    });
}


function fetch2(url, callback) {
    axios.get(url).then(res => callback(res.data))
}

function fetch_search_multi(query, callback) {

    fetch(config.urls.multi_search(query), callback, data => {
        let ans = []
        for (let i = 0; i < 7 && i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.name || item.title,
                image: config.urls.backdrop(item.backdrop_path),
                type: item.media_type
            })
        }
        callback(ans)
    })
}

function fetch_popular_movie(callback) {
    fetch(config.urls.popular_movie, callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.title,
                image: config.urls.poster(item.poster_path),
                date: item.release_date || item.first_air_date
            })
        }
        callback(ans)
    })
}

function fetch_top_movie(callback) {
    fetch(config.urls.top_movie, callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.title,
                image: config.urls.poster(item.poster_path),
                date: item.release_date || item.first_air_date
            })
        }
        callback(ans)
    })
}

function fetch_trending_movie(callback) {
    fetch(config.urls.trending_movie, callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.title,
                image: config.urls.poster(item.poster_path)
            })
        }
        callback(ans)
    })
}

function fetch_current_playing_movie(callback) {
    fetch(config.urls.current_playing_movie, callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length && i < 5; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.title,
                image: config.urls.poster(item.poster_path)
            })
        }
        callback(ans)
    })
}

function fetch_recommended_movie(id, callback) {
    fetch(config.urls.recommended_movie(id), callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.title,
                image: config.urls.poster(item.poster_path),
                date: item.release_date || item.first_air_date
            })
        }
        callback(ans)
    })
}

function fetch_similar_movie(id, callback) {
    fetch(config.urls.similar_movie(id), callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.title,
                image: config.urls.poster(item.poster_path),
                date: item.release_date || item.first_air_date
            })
        }
        callback(ans)
    })
}

function fetch_movie_video(id, callback) {
    fetch(config.urls.movie_video(id), callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                site: item.site,
                title: item.name,
                type: item.type,
                key: item.key
            })
        }
        callback(ans)
    })
}

function fetch_movie_details(id, callback) {
    fetch(config.urls.movie_detail(id), callback, data => {

        let ans = {
            id: data.id,
            title: data.title,
            genres: data.genres,
            spoken_languages: data.spoken_languages,
            release_date: data.release_date,
            runtime: data.runtime,
            overview: data.overview,
            vote_average: data.vote_average,
            tagline: data.tagline,
            poster: config.urls.poster(data.poster_path)
        }
        callback(ans)
    })
}

function fetch_movie_reviews(id, callback) {
    fetch(config.urls.movie_reviews(id), callback, data => {

        let ans = []
        for (let i = 0; i < data.results.length && i < 10; i++) {
            const item = data.results[i]
            const avatar = get_avartar(item.author_details.avatar_path)
            ans.push({
                author: item.author,
                content: item.content,
                created_at: item.created_at,
                url: item.url,
                rating: item.author_details.rating,
                avatar_path: avatar
            })
        }
        callback(ans)
    })
}

function fetch_movie_cast(id, callback) {
    fetch(config.urls.movie_cast(id), callback, data => {
        let ans = []
        for (let i = 0; i < data.cast.length && i < 10; i++) {
            const item = data.cast[i]
            ans.push({
                id: item.id,
                title: item.name,
                character: item.character,
                profile: config.urls.profile(item.profile_path)
            })
        }
        callback(ans)
    })
}









function fetch_popular_tv(callback) {
    fetch(config.urls.popular_tv, callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.name,
                image: config.urls.poster(item.poster_path),
                date: item.release_date || item.first_air_date
            })
        }
        callback(ans)
    })
}

function fetch_top_tv(callback) {
    fetch(config.urls.top_tv, callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.name,
                image: config.urls.poster(item.poster_path),
                date: item.release_date || item.first_air_date
            })
        }
        callback(ans)
    })
}

function fetch_trending_tv(callback) {
    fetch(config.urls.trending_tv, callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.name,
                image: config.urls.poster(item.poster_path)
            })
        }
        callback(ans)
    })
}

function fetch_recommended_tv(id, callback) {
    fetch(config.urls.recommended_tv(id), callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.name,
                image: config.urls.poster(item.poster_path),
                date: item.release_date || item.first_air_date
            })
        }
        callback(ans)
    })
}

function fetch_similar_tv(id, callback) {
    fetch(config.urls.similar_tv(id), callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                id: item.id,
                title: item.name,
                image: config.urls.poster(item.poster_path),
                date: item.release_date || item.first_air_date
            })
        }
        callback(ans)
    })
}

function fetch_tv_video(id, callback) {
    fetch(config.urls.tv_video(id), callback, data => {
        let ans = []
        for (let i = 0; i < data.results.length; i++) {
            const item = data.results[i]
            ans.push({
                site: item.site,
                title: item.name,
                type: item.type,
                key: item.key
            })
        }
        callback(ans)
    })
}

function fetch_tv_details(id, callback) {
    fetch(config.urls.tv_detail(id), callback, data => {

        let ans = {
            id: data.id,
            title: data.name,
            genres: data.genres,
            spoken_languages: data.spoken_languages,
            first_air_date: data.first_air_date,
            episode_run_time: data.episode_run_time,
            overview: data.overview,
            vote_average: data.vote_average,
            tagline: data.tagline,
            poster: config.urls.poster(data.poster_path)
        }
        callback(ans)
    })
}


function fetch_tv_reviews(id, callback) {
    fetch(config.urls.tv_reviews(id), callback, data => {

        let ans = []
        for (let i = 0; i < data.results.length && i < 10; i++) {
            const item = data.results[i]
            const avatar = get_avartar(item.author_details.avatar_path)
            ans.push({
                author: item.author,
                content: item.content,
                created_at: item.created_at,
                url: item.url,
                rating: item.author_details.rating,
                avatar_path: avatar
            })
        }
        callback(ans)
    })
}

function fetch_tv_cast(id, callback) {
    fetch(config.urls.tv_cast(id), callback, data => {
        let ans = []
        for (let i = 0; i < data.cast.length && i < 10; i++) {
            const item = data.cast[i]
            ans.push({
                id: item.id,
                title: item.name,
                character: item.character,
                profile: config.urls.profile(item.profile_path)
            })
        }
        callback(ans)
    })
}

function fetch_cast_detail(id, callback) {
    fetch(config.urls.cast_detail(id), callback, data => {
        callback({
            birthday: data.birthday,
            gender: data.gender,
            title: data.name,
            homepage: data.homepage,
            also_known_as: data.also_known_as,
            known_for_department: data.known_for_department,
            biography: data.biography,
            place_of_birth: data.place_of_birth
        })
    })
}

function fetch_cast_external_ids(id, callback) {
    fetch(config.urls.cast_external_ids(id), callback, data => {
        callback({
            imdb_id: data.imdb_id,
            facebook_id: data.facebook_id,
            instagram_id: data.instagram_id,
            twitter_id: data.twitter_id,
        })
    })
}

module.exports = {
    search_multi: fetch_search_multi,

    popular_movie: fetch_popular_movie,
    top_movie: fetch_top_movie,
    trending_movie: fetch_trending_movie,
    current_playing_movie: fetch_current_playing_movie,
    recommended_movie: fetch_recommended_movie,
    similar_movie: fetch_similar_movie,
    movie_video: fetch_movie_video,
    movie_details: fetch_movie_details,
    movie_reviews: fetch_movie_reviews,
    movie_cast: fetch_movie_cast,

    popular_tv: fetch_popular_tv,
    top_tv: fetch_top_tv,
    trending_tv: fetch_trending_tv,
    recommended_tv: fetch_recommended_tv,
    similar_tv: fetch_similar_tv,
    tv_video: fetch_tv_video,
    tv_details: fetch_tv_details,
    tv_reviews: fetch_tv_reviews,
    tv_cast: fetch_tv_cast,

    cast_detail: fetch_cast_detail,
    cast_external_ids: fetch_cast_external_ids
}