const api_url = 'https://tmdb-node.ue.r.appspot.com/api'

const urls = {
    search_multi: query => `${api_url}/search_multi/${query}`,

    popular_movie: `${api_url}/popular_movie`,
    top_movie: `${api_url}/top_movie`,
    trending_movie: `${api_url}/trending_movie`,
    current_playing_movie: `${api_url}/current_playing_movie`,
    recommended_movie: id => `${api_url}/recommended_movie/${id}`,
    similar_movie: id => `${api_url}/similar_movie/${id}`,
    movie_video: id => `${api_url}/movie_video/${id}`,
    movie_details: id => `${api_url}/movie_details/${id}`,
    movie_reviews: id => `${api_url}/movie_reviews/${id}`,
    movie_cast: id => `${api_url}/movie_cast/${id}`,

    popular_tv: `${api_url}/popular_tv`,
    top_tv: `${api_url}/top_tv`,
    trending_tv: `${api_url}/trending_tv`,
    recommended_tv: id => `${api_url}/recommended_tv/${id}`,
    similar_tv: id => `${api_url}/similar_tv/${id}`,
    tv_video: id => `${api_url}/tv_video/${id}`,
    tv_details: id => `${api_url}/tv_details/${id}`,
    tv_reviews: id => `${api_url}/tv_reviews/${id}`,
    tv_cast: id => `${api_url}/tv_cast/${id}`,

    cast_detail: id => `${api_url}/cast_detail/${id}`,
    cast_external_ids: id => `${api_url}/cast_external_ids/${id}`,

}


export default urls