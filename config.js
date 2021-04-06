require('dotenv').config()

const api_key = 'e46f50f1468f97c817ce9f7598851c3d'
const debugging = process.env.NODE_ENV === 'production' ? false : true
const api_url = debugging ? 'http://localhost:5000' : 'https://nodetmdbangular.ue.r.appspot.com'
const image_url = 'https://image.tmdb.org/t/p'

const placeholder = {
    backdrop_placeholder: `${api_url}/api/placeholder/backdrop`,
    poster_placeholder: `${api_url}/api/placeholder/poster`,
    profile_placeholder: `${api_url}/api/placeholder/profile`,
    review_placeholder: `${api_url}/api/placeholder/review`,
}


module.exports = {
    debugging: debugging,
    api_key: api_key,
    urls: {
        multi_search: query => `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${query}`,

        popular_movie: `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`,
        top_movie: `https://api.themoviedb.org/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`,
        trending_movie: `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}&language=en-US&page=1`,
        current_playing_movie: `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`,
        recommended_movie: id => `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`,
        similar_movie: id => `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}&language=en-US&page=1`,
        movie_video: id => `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${api_key}&language=en-US&page=1`,
        movie_detail: id => `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US&page=1`,
        movie_reviews: id => `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${api_key}&language=en-US&page=1`,
        movie_cast: id => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}&language=en-US&page=1`,

        popular_tv: `https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1`,
        top_tv: `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`,
        trending_tv: `https://api.themoviedb.org/3/trending/tv/day?api_key=${api_key}&language=en-US&page=1`,
        current_playing_tv: `https://api.themoviedb.org/3/tv/now_playing?api_key=${api_key}&language=en-US&page=1`,
        recommended_tv: id => `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${api_key}&language=en-US&page=1`,
        similar_tv: id => `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${api_key}&language=en-US&page=1`,
        tv_video: id => `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}&language=en-US&page=1`,
        tv_detail: id => `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US&page=1`,
        tv_reviews: id => `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${api_key}&language=en-US&page=1`,
        tv_cast: id => `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${api_key}&language=en-US&page=1`,


        cast_detail: id => `https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=en-US&page=1`,
        cast_external_ids: id => `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${api_key}&language=en-US&page=1`,

        backdrop: image => image ? `${image_url}/w780${image}` : placeholder.backdrop_placeholder,
        poster: image => image ? `${image_url}/w500${image}` : placeholder.poster_placeholder,
        profile: image => image ? `${image_url}/w500${image}` : placeholder.profile_placeholder,
        review: image => image ? `https://image.tmdb.org/t/p/original${image}` : placeholder.review_placeholder,

    },

}