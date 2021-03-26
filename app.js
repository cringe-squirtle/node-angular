const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const fetcher = require('./fetcher')
const path = require('path');

app.use(express.static(__dirname + '/ui/dist/ui'));
app.use(express.static(__dirname + '/api-ui'));

app.get('/api', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/api-ui/index.html'))
})


app.get('/api/search_multi/:query', function (req, res) {
    fetcher.search_multi(req.params.query, data => res.send(data))
})

app.get('/api/popular_movie', function (req, res) {
    fetcher.popular_movie(data => res.send(data))
})

app.get('/api/top_movie', function (req, res) {
    fetcher.top_movie(data => res.send(data))
})

app.get('/api/trending_movie', function (req, res) {
    fetcher.trending_movie(data => res.send(data))
})

app.get('/api/current_playing_movie', function (req, res) {
    fetcher.current_playing_movie(data => res.send(data))
})

app.get('/api/recommended_movie/:id', function (req, res) {
    fetcher.recommended_movie(req.params.id, data => res.send(data))
})

app.get('/api/similar_movie/:id', function (req, res) {
    fetcher.similar_movie(req.params.id, data => res.send(data))
})

app.get('/api/movie_video/:id', function (req, res) {
    fetcher.movie_video(req.params.id, data => res.send(data))
})

app.get('/api/movie_details/:id', function (req, res) {
    fetcher.movie_details(req.params.id, data => res.send(data))
})

app.get('/api/movie_reviews/:id', function (req, res) {
    fetcher.movie_reviews(req.params.id, data => res.send(data))
})

app.get('/api/movie_cast/:id', function (req, res) {
    fetcher.movie_cast(req.params.id, data => res.send(data))
})




app.get('/api/popular_tv', function (req, res) {
    fetcher.popular_tv(data => res.send(data))
})

app.get('/api/top_tv', function (req, res) {
    fetcher.top_tv(data => res.send(data))
})

app.get('/api/trending_tv', function (req, res) {
    fetcher.trending_tv
        (data => res.send(data))
})

app.get('/api/recommended_tv/:id', function (req, res) {
    fetcher.recommended_tv(req.params.id, data => res.send(data))
})

app.get('/api/similar_tv/:id', function (req, res) {
    fetcher.similar_tv(req.params.id, data => res.send(data))
})

app.get('/api/tv_video/:id', function (req, res) {
    fetcher.tv_video(req.params.id, data => res.send(data))
})

app.get('/api/tv_details/:id', function (req, res) {
    fetcher.tv_details(req.params.id, data => res.send(data))
})

app.get('/api/tv_reviews/:id', function (req, res) {
    fetcher.tv_reviews(req.params.id, data => res.send(data))
})

app.get('/api/tv_cast/:id', function (req, res) {
    fetcher.tv_cast(req.params.id, data => res.send(data))
})



app.get('/api/cast_detail/:id', function (req, res) {
    fetcher.cast_detail(req.params.id, data => res.send(data))
})

app.get('/api/cast_external_ids/:id', function (req, res) {
    fetcher.cast_external_ids(req.params.id, data => res.send(data))
})



app.get('/api/placeholder/backdrop', (req, res) => {
    res.sendFile(__dirname + '/backdrop.jpg')
})

app.get('/api/placeholder/poster', (req, res) => {
    res.sendFile(__dirname + '/poster.png')
})

app.get('/api/placeholder/profile', (req, res) => {
    res.sendFile(__dirname + '/profile.png')
})

app.get('/api/placeholder/review', (req, res) => {
    res.sendFile(__dirname + '/review.jpg')
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/ui/dist/ui/index.html'))
});



const server = require('http').createServer(app)
server.listen(process.env.PORT || 5000)